import React from 'react';
import tokens from '../../config/report_style_tokens.json';

interface ScrollPanelProps {
    children: React.ReactNode;
    className?: string;
    backgroundImage?: string;
}

export default function ScrollPanel({ children, className = "", backgroundImage }: ScrollPanelProps) {
    const bgUrl = backgroundImage || tokens.panels.background_image_url;
    
    return (
        <div 
            className={`relative w-full flex flex-col items-center justify-center overflow-hidden ${className}`}
            style={{
                fontFamily: tokens.typography.font_family_serif,
                color: tokens.typography.text_color_primary,
                minHeight: '100vh', // Each panel is at least full height for immersive feel
                padding: '4rem 1.5rem', // Fallback
            }}
        >
            {/* Background Texture */}
            <div 
                className="absolute inset-0 z-0 w-full h-full"
                style={{
                    backgroundImage: `url(${bgUrl})`,
                    backgroundSize: 'cover', // or contain depending on texture
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat', // For scroll feeling, usually repeat-y if it's a pattern
                }}
            />
            
            {/* Overlay for Readability */}
            <div 
                className="absolute inset-0 z-0 w-full h-full"
                style={{
                    backgroundColor: tokens.panels.overlay_color,
                    backdropFilter: 'blur(2px)'
                }}
            />

            {/* Content Container */}
            <div 
                className="relative z-10 w-full"
                style={{
                    maxWidth: tokens.layout.max_width,
                    fontSize: tokens.typography.font_size_body,
                    lineHeight: tokens.typography.line_height_body,
                    letterSpacing: tokens.typography.letter_spacing_body,
                }}
            >
                {children}
            </div>
        </div>
    );
}
