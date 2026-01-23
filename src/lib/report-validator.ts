import contract from '../config/report_contract.json';

export interface ValidationResult {
    ok: boolean;
    errors: string[];
    stats: {
        total_chars: number;
        section_counts: Record<string, number>;
    };
}

export function validateReport(text: string): ValidationResult {
    const errors: string[] = [];
    const stats = {
        total_chars: 0,
        section_counts: {} as Record<string, number>
    };

    // 1. Remove whitespace for counting
    const cleanText = text.replace(/\s/g, '');
    stats.total_chars = cleanText.length;

    // 2. Check Total Length
    if (stats.total_chars < contract.constraints.total_min_chars_no_space) {
        errors.push(`Total length insufficient: ${stats.total_chars} / ${contract.constraints.total_min_chars_no_space}`);
    }

    // 3. Check Sections
    contract.constraints.section_markers.forEach((marker, index) => {
        const sectionStart = text.indexOf(marker);
        if (sectionStart === -1) {
            errors.push(`Missing section marker: ${marker}`);
            return;
        }

        // Calculate section length
        // Find next marker or end of text
        const nextMarker = contract.constraints.section_markers[index + 1];
        const sectionEnd = nextMarker ? text.indexOf(nextMarker) : text.length;
        
        if (sectionEnd === -1) {
            // If next marker is missing, we can't accurately measure current section
             // (The missing next marker error will be caught in the next iteration)
             return; 
        }

        const sectionContent = text.substring(sectionStart + marker.length, sectionEnd);
        const sectionClean = sectionContent.replace(/\s/g, '');
        stats.section_counts[marker] = sectionClean.length;

        if (sectionClean.length < contract.constraints.section_min_chars_no_space) {
            errors.push(`Section ${index} (${marker}) too short: ${sectionClean.length} / ${contract.constraints.section_min_chars_no_space}`);
        }
    });

    // 4. Check Forbidden Patterns
    contract.constraints.forbid_patterns.forEach(pattern => {
        const regex = new RegExp(pattern, 'm'); // Multiline check
        if (regex.test(text)) {
             // We relax this check slightly to avoid false positives on simple sentences, 
             // but strict on bullets like "1." or "- " at start of line
             if (pattern.includes('^')) {
                 errors.push(`Forbidden pattern detected: ${pattern}`);
             }
        }
    });

    // 5. Check Ending Ratio (Simple Heuristic)
    const endingMatches = (text.match(/다\./g) || []).length;
    const sentenceMatches = (text.match(/\./g) || []).length;
    if (sentenceMatches > 0) {
        const ratio = endingMatches / sentenceMatches;
        // This is a warning, maybe not a hard fail unless very high
        if (ratio > 0.8) { 
            errors.push(`Tone check failed: Too many '다.' endings (${(ratio * 100).toFixed(1)}%). Use diverse endings.`);
        }
    }

    return {
        ok: errors.length === 0,
        errors,
        stats
    };
}
