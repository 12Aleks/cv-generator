'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Controller, useFormContext } from 'react-hook-form';
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    List,
    ListOrdered,
    AlignLeft,
    AlignCenter,
    AlignRight,
} from 'lucide-react';

interface Props {
    name: string;
}

export default function TiptapEditor({ name }: Props) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => {
                const editor = useEditor({
                    extensions: [
                        StarterKit.configure({
                            bulletList: { keepMarks: true },
                            orderedList: { keepMarks: true },
                        }),
                        Underline,
                        TextAlign.configure({
                            types: ['heading', 'paragraph'],
                        }),
                    ],
                    content: field.value,
                    onUpdate: ({ editor }) => {
                        field.onChange(editor.getHTML());
                    },
                });

                if (!editor) {
                    return <div className="text-sm text-gray-500">Ładowanie edytora...</div>;
                }

                const buttonClass = (active: boolean) =>
                    `p-2 rounded hover:bg-gray-200 transition ${
                        active ? 'bg-gray-300 text-blue-600' : 'text-gray-700'
                    }`;

                return (
                    <div>
                        <div className="flex flex-wrap gap-1 mb-2 border border-gray-300 rounded bg-white p-1.5">
                            <div className="w-full p-2 rounded bg-gray-50 border border-gray-300 min-h-[300px]">
                                <EditorContent editor={editor} />
                            </div>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                className={buttonClass(editor.isActive('bold'))}
                            >
                                <Bold size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                className={buttonClass(editor.isActive('italic'))}
                            >
                                <Italic size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleUnderline().run()}
                                className={buttonClass(editor.isActive('underline'))}
                            >
                                <UnderlineIcon size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleBulletList().run()}
                                className={buttonClass(editor.isActive('bulletList'))}
                            >
                                <List size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                className={buttonClass(editor.isActive('orderedList'))}
                            >
                                <ListOrdered size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                                className={buttonClass(editor.isActive({ textAlign: 'left' }))}
                            >
                                <AlignLeft size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                                className={buttonClass(editor.isActive({ textAlign: 'center' }))}
                            >
                                <AlignCenter size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                                className={buttonClass(editor.isActive({ textAlign: 'right' }))}
                            >
                                <AlignRight size={18} />
                            </button>
                        </div>

                    </div>
                );
            }}
        />
    );
}
