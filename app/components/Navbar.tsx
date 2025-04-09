'use client';

import { ArrowLeft, Download } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="w-full bg-zinc-900 text-white px-4 py-2 flex items-center justify-between">
            {/* Левая часть */}
            <div className="flex items-center space-x-2">
                <button className="border border-zinc-700 rounded px-3 py-1 flex items-center hover:bg-zinc-800 transition">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    <span>CV</span>
                </button>
            </div>

            {/* Центр — название файла */}
            <div className="absolute left-1/2 transform -translate-x-1/2 text-sm font-medium">
                CV Oleksii Koba pl.pdf
            </div>

            {/* Правая часть */}
            <div className="flex items-center space-x-2">
                <button className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-1 px-4 rounded flex items-center transition">
                    <Download className="w-4 h-4 mr-2" />
                    Pobierz
                </button>
            </div>
        </nav>
    );
}