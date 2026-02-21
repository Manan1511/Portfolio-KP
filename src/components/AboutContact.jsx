import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

export default function AboutContact() {
    const [terminalInput, setTerminalInput] = useState('');
    const [outputLines, setOutputLines] = useState([
        'SYS.CONNECTION ESTABLISHED.',
        'Type "fetch resume" to download technical dossier.',
        'Or type "contact" to initiate comms.'
    ]);

    const handleTerminalSubmit = (e) => {
        e.preventDefault();
        if (!terminalInput.trim()) return;

        const cmd = terminalInput.trim().toLowerCase();
        const newLines = [...outputLines, `> ${cmd}`];

        if (cmd === 'fetch resume') {
            newLines.push('DOWNLOADING: John_Doe_Resume.pdf...');
            newLines.push('Done. (Check your browser downloads)');

            // Trigger fake download
            const link = document.createElement('a');
            link.href = 'data:application/pdf;base64,JVBERi0xLjQKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSL0ZpbHRlci9GbGF0ZURlY29kZT4+CnN0cmVhbQpHaB...'; // dummy base64
            link.download = 'John_Doe_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else if (cmd === 'contact') {
            newLines.push('INITIATING MAIL PROTOCOL -> mailto:contact@johndoe.com');
            // window.location.href = 'mailto:contact@johndoe.com';
        } else {
            newLines.push(`Command not recognized: ${cmd}`);
        }

        // Keep only last 6 lines to prevent overflow
        setOutputLines(newLines.slice(-6));
        setTerminalInput('');
    };

    return (
        <section className="relative w-full py-24 overflow-hidden border-t border-slate/10 bg-black backdrop-blur-md">
            {/* Background Grid Accent */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-cyan/5 via-deep-space to-deep-space -z-10" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Portrait & Terminal */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-8"
                    >
                        {/* Gritty Portrait Placeholder */}
                        <div className="relative w-full aspect-square md:aspect-[4/3] bg-slate-900 border border-slate/20 shadow-[0_0_20px_rgba(0,0,0,0.8)] overflow-hidden group">
                            <div className="absolute inset-0 bg-deep-space/50 mix-blend-multiply z-10" />
                            {/* Scanline effect */}
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,212,255,0.05)_50%)] bg-[length:100%_4px] z-20 pointer-events-none opacity-50" />

                            <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-slate">
                                <div className="border border-slate/20 p-8 border-dashed flex flex-col items-center">
                                    <Terminal className="w-8 h-8 text-slate/50 mb-4" />
                                    <span className="uppercase tracking-widest text-xs font-mono">Workspace_Feed_Offline.jpg</span>
                                    <p className="mt-2 text-[10px] text-slate/40">Gritty workspace/portrait layout</p>
                                </div>
                            </div>

                            {/* Angle brackets decorative */}
                            <div className="absolute top-4 left-4 border-t-2 border-l-2 border-cyan/30 w-8 h-8 z-30 transition-all group-hover:border-cyan" />
                            <div className="absolute bottom-4 right-4 border-b-2 border-r-2 border-cyan/30 w-8 h-8 z-30 transition-all group-hover:border-cyan" />
                        </div>

                        {/* Terminal Contact Interface */}
                        <div className="w-full bg-[#050B14] border border-cyan/20 p-4 font-mono shadow-[0_0_15px_rgba(0,212,255,0.1)]">
                            <div className="flex items-center justify-between border-b border-cyan/20 pb-2 mb-4">
                                <span className="text-cyan text-xs uppercase tracking-widest">Sys.Terminal</span>
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-slate/30" />
                                    <div className="w-2 h-2 rounded-full bg-slate/30" />
                                    <div className="w-2 h-2 rounded-full bg-cyan/50 animate-pulse" />
                                </div>
                            </div>

                            <div className="text-cyan text-xs leading-relaxed space-y-1 mb-4 min-h-[100px] flex flex-col justify-end">
                                <AnimatePresence>
                                    {outputLines.map((line, i) => (
                                        <motion.div
                                            key={i + line}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={line.startsWith('>') ? 'text-off-white' : 'text-cyan/70'}
                                        >
                                            {line}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 border-t border-cyan/20 pt-3">
                                <span className="text-orange">{'>'}</span>
                                <input
                                    type="text"
                                    value={terminalInput}
                                    onChange={(e) => setTerminalInput(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none text-off-white text-xs placeholder:text-slate/30"
                                    placeholder="Enter command..."
                                    autoComplete="off"
                                    spellCheck="false"
                                />
                                <button type="submit" className="hidden">Submit</button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Right Column: Bio & Philosophy */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-8 justify-center h-full"
                    >
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold text-off-white uppercase tracking-tight mb-8">
                                The <span className="text-cyan">Philosophy</span>
                            </h2>

                            <div className="prose prose-invert max-w-none">
                                <p className="text-slate text-lg leading-relaxed mb-6 font-light">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
                                </p>
                                <div className="border-l-2 border-orange pl-6 py-2 my-8 bg-orange/5">
                                    <p className="text-off-white text-xl font-medium tracking-wide leading-snug">
                                        Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci.
                                    </p>
                                </div>
                                <p className="text-slate text-lg leading-relaxed mb-6 font-light">
                                    Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer aliquet, nunc id commodo posuere, nulla ex ultrices ipsum, pretium blandit enim ex quis diam.
                                </p>
                                <p className="text-cyan font-semibold tracking-wide mt-10">
                                    Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque, let&apos;s connect.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Footer Quote */}
            <footer className="w-full mt-32 border-t border-slate/10 pt-8 pb-12 px-6 text-center bg-black">
                <p className="text-slate/60 font-mono text-sm max-w-2xl mx-auto italic">
                    &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit.&quot;
                </p>
                <div className="mt-8 text-[10px] text-slate/30 uppercase tracking-[0.3em]">
                    John Doe / Sys.Offline
                </div>
            </footer>
        </section>
    );
}
