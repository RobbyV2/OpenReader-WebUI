import Link from 'next/link';
import { DragEvent } from 'react';
import { Button } from '@headlessui/react';
import { PDFIcon, EPUBIcon, FileIcon } from '@/components/icons/Icons';
import { DocumentListDocument } from '@/types/documents';

interface DocumentListItemProps {
  doc: DocumentListDocument;
  onDelete: (doc: DocumentListDocument) => void;
  dragEnabled?: boolean;
  onDragStart?: (doc: DocumentListDocument) => void;
  onDragEnd?: () => void;
  onDragOver?: (e: DragEvent, doc: DocumentListDocument) => void;
  onDragLeave?: () => void;
  onDrop?: (e: DragEvent, doc: DocumentListDocument) => void;
  isDropTarget?: boolean;
}

export function DocumentListItem({
  doc,
  onDelete,
  dragEnabled = true,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  isDropTarget = false,
}: DocumentListItemProps) {
  // Only allow drag and drop interactions for documents not in folders
  const isDraggable = dragEnabled && !doc.folderId;
  const allowDropTarget = !doc.folderId;

  return (
    <div
      draggable={isDraggable}
      onDragStart={() => onDragStart?.(doc)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => allowDropTarget && onDragOver?.(e, doc)}
      onDragLeave={() => allowDropTarget && onDragLeave?.()}
      onDrop={(e) => allowDropTarget && onDrop?.(e, doc)}
      className={`
        w-full
        ${allowDropTarget && isDropTarget ? 'ring-2 ring-accent bg-primary/10' : ''}
        bg-background rounded-lg p-2 shadow hover:shadow-md transition-shadow
      `}
    >
      <div className="flex items-center rounded-lg">
        <Link
          href={`/${doc.type}/${encodeURIComponent(doc.id)}`}
          draggable={false}
          className="document-link flex items-center align-center space-x-4 w-full truncate hover:bg-base rounded-lg p-0.5 sm:p-1 transition-colors"
        >
          <div className="flex-shrink-0">
            {doc.type === 'pdf' ? <PDFIcon /> : doc.type === 'epub' ? <EPUBIcon /> : <FileIcon />}
          </div>
          <div className="flex flex-col min-w-0 transform transition-transform duration-200 ease-in-out hover:scale-[1.02] w-full truncate">
            <p className="text-sm sm:text-md text-foreground font-medium truncate">{doc.name}</p>
            <p className="text-xs sm:text-sm text-muted truncate">
              {(doc.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </Link>
        <Button
          onClick={() => onDelete(doc)}
          className="ml-4 p-2 text-muted hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
          aria-label="Delete document"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </Button>
      </div>
    </div>
  );
}