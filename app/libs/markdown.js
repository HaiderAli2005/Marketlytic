/**
 * Enhanced markdown parser for basic formatting
 * Currently supports:
 * - **text** for bold text
 * - # Heading for h1, ## Heading for h2, etc.
 * - - item for bullet lists
 * - 1. item for numbered lists
 */

export function parseMarkdown(text) {
  if (!text || typeof text !== 'string') {
    return text;
  }

  // Split text into lines to handle headings and lists
  const lines = text.split('\n');
  const blocks = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Skip empty lines
    if (!trimmedLine) {
      blocks.push({ type: 'text', content: '\n' });
      continue;
    }

    // Parse headings: # Heading, ## Heading, etc.
    const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const content = headingMatch[2];
      blocks.push({
        type: `h${level}`,
        content: parseInlineMarkdown(content)
      });
      continue;
    }

    // Parse bullet lists: - item
    if (trimmedLine.startsWith('- ')) {
      const content = trimmedLine.substring(2);
      blocks.push({
        type: 'li-bullet',
        content: parseInlineMarkdown(content)
      });
      continue;
    }

    // Parse numbered lists: 1. item, 2. item, etc.
    const numberedMatch = trimmedLine.match(/^\d+\.\s+(.+)$/);
    if (numberedMatch) {
      const content = numberedMatch[1];
      blocks.push({
        type: 'li-numbered',
        content: parseInlineMarkdown(content)
      });
      continue;
    }

    // Regular text line
    blocks.push({
      type: 'text',
      content: parseInlineMarkdown(trimmedLine)
    });
  }

  return blocks;
}

// Parse inline markdown (bold, italic, etc.)
function parseInlineMarkdown(text) {
  if (!text || typeof text !== 'string') {
    return text;
  }

  // Parse bold text: **text** -> <strong>text</strong>
  const boldRegex = /\*\*(.*?)\*\*/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex, match.index)
      });
    }

    // Add the bold text
    parts.push({
      type: 'bold',
      content: match[1]
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.slice(lastIndex)
    });
  }

  return parts.length > 0 ? parts : [{ type: 'text', content: text }];
}

/**
 * Render parsed markdown as React elements
 */
export function renderMarkdown(parsedParts, className = '') {
  if (!Array.isArray(parsedParts)) {
    return parsedParts;
  }

  return parsedParts.map((part, index) => {
    // Handle headings
    if (part.type.startsWith('h') && part.type.length === 2) {
      const level = part.type[1];
      const HeadingTag = `h${level}`;
      return (
        <HeadingTag key={index} className={`${className} font-bold`}>
          {renderInlineMarkdown(part.content, className)}
        </HeadingTag>
      );
    }

    // Handle unordered lists
    if (part.type === 'ul') {
      return (
        <ul key={index} className={`${className} list-disc list-inside space-y-1 my-2`}>
          {part.items.map((item, itemIndex) => (
            <li key={itemIndex} className="ml-4">
              {renderInlineMarkdown(item.content, className)}
            </li>
          ))}
        </ul>
      );
    }

    // Handle ordered lists
    if (part.type === 'ol') {
      return (
        <ol key={index} className={`${className} list-decimal list-inside space-y-1 my-2`}>
          {part.items.map((item, itemIndex) => (
            <li key={itemIndex} className="ml-4">
              {renderInlineMarkdown(item.content, className)}
            </li>
          ))}
        </ol>
      );
    }

    // Handle individual list items (fallback)
    if (part.type === 'li-bullet' || part.type === 'li-numbered') {
      return (
        <li key={index} className={`${className} ml-4`}>
          {renderInlineMarkdown(part.content, className)}
        </li>
      );
    }

    // Handle text (including bold)
    if (part.type === 'text') {
      if (part.content === '\n') {
        return <br key={index} />;
      }
      return (
        <span key={index} className={className}>
          {renderInlineMarkdown(part.content, className)}
        </span>
      );
    }

    // Handle bold text
    if (part.type === 'bold') {
      return (
        <strong key={index} className={className}>
          {part.content}
        </strong>
      );
    }

    // Default fallback
    return (
      <span key={index} className={className}>
        {part.content}
      </span>
    );
  });
}

// Render inline markdown elements
function renderInlineMarkdown(content, className = '') {
  if (!Array.isArray(content)) {
    return content;
  }

  return content.map((item, index) => {
    if (item.type === 'bold') {
      return (
        <strong key={index} className={className}>
          {item.content}
        </strong>
      );
    }
    return (
      <span key={index} className={className}>
        {item.content}
      </span>
    );
  });
}

/**
 * Combined function to parse and render markdown text
 */
export function formatText(text, className = '') {
  if (!text || typeof text !== 'string') {
    return text;
  }

  const parsed = parseMarkdown(text);
  
  // Group consecutive list items into lists
  const processedBlocks = [];
  let currentBulletList = [];
  let currentNumberedList = [];
  
  for (let i = 0; i < parsed.length; i++) {
    const block = parsed[i];
    
    if (block.type === 'li-bullet') {
      // If we have numbered list items, flush them first
      if (currentNumberedList.length > 0) {
        processedBlocks.push({
          type: 'ol',
          items: [...currentNumberedList]
        });
        currentNumberedList = [];
      }
      currentBulletList.push(block);
    } else if (block.type === 'li-numbered') {
      // If we have bullet list items, flush them first
      if (currentBulletList.length > 0) {
        processedBlocks.push({
          type: 'ul',
          items: [...currentBulletList]
        });
        currentBulletList = [];
      }
      currentNumberedList.push(block);
    } else {
      // Flush any accumulated lists
      if (currentBulletList.length > 0) {
        processedBlocks.push({
          type: 'ul',
          items: [...currentBulletList]
        });
        currentBulletList = [];
      }
      if (currentNumberedList.length > 0) {
        processedBlocks.push({
          type: 'ol',
          items: [...currentNumberedList]
        });
        currentNumberedList = [];
      }
      processedBlocks.push(block);
    }
  }
  
  // Handle any remaining list items
  if (currentBulletList.length > 0) {
    processedBlocks.push({
      type: 'ul',
      items: currentBulletList
    });
  }
  if (currentNumberedList.length > 0) {
    processedBlocks.push({
      type: 'ol',
      items: currentNumberedList
    });
  }
  
  return renderMarkdown(processedBlocks, className);
}
