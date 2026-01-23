
export interface VoiceProfile {
    display_name_kr: string;
    internal_name: string;
    tone_identity: string;
    base_tone: string;
    speech_rules: {
        basic_endings: string[];
        variation_endings: string[];
        second_person: string;
        second_person_variations: string[];
    };
    forbiddens: {
        words: string[];
        styles: string[];
    };
    signature_lines_pool: string[];
    opener_variants: string[];
    metaphor_palette: string;
    cta: string;
}

export interface ReportSection {
    id: number | string;
    title: string;
    length_guideline: string;
    content_rules: string[];
}

export interface ReportFormat {
    structure: {
        total_length_guideline: string;
        sections: ReportSection[];
    };
}

export interface VariationRules {
    schema_version: string;
    global_order_rule: any;
    levers: {
        opener_variant: LeverDefinition;
        metaphor_palette: LeverDefinition;
        emphasis_axis: LeverDefinition;
        sentence_rhythm: LeverDefinition;
    };
    safety_and_claims: {
        forbidden_phrases: string[];
        required_hedges: string[];
        money_investing_disclaimer_required: boolean;
        mental_health_disclaimer_required: boolean;
    };
}

export interface LeverDefinition {
    id: string;
    type: string;
    choices: LeverChoice[];
    count?: number; // for subset type
    instruction?: string;
    note?: string;
}

export interface LeverChoice {
    key: string;
    label: string;
    instruction?: string;
    examples?: string[];
}

export interface PromptBuilderInput {
    sage_slug: string;
    question_id: string;
    user_or_guest_id: string;
    purchase_count_or_session_counter: number;
    date_yyyy_mm_dd: string;
    saju_result: {
        year_pillar: string;
        month_pillar: string;
        day_pillar: string;
        hour_pillar: string;
        // Legacy fields (optional or kept for compatibility)
        day_pillar_legacy?: string;
        month_branch?: string;
        hour_branch?: string;
        gender: string;
        lunar_solar: string;
        leap_month: boolean;
        time_bucket: string;
    };
    question_text: string;
    optional_user_concern_text?: string;
    saju_traits: {
        day: string[];
        month: string[];
        hour: string[];
    };
}

export interface PromptBuilderOutput {
    selected_levers: {
        opener_variant: LeverChoice;
        metaphor_palette: LeverChoice;
        emphasis_axis: LeverChoice[];
        sentence_rhythm: LeverChoice;
    };
    final_prompt: string;
    seed_hash: string;
}
