
import { computeSaju } from '../../src/lib/saju-calculator';

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, birth_date, calendar, is_leap_month, birth_time_type, gender } = req.body;

        // Basic Validation
        if (!name || !birth_date || !calendar || !birth_time_type || !gender) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            const result = computeSaju(name, birth_date, calendar, is_leap_month, birth_time_type, gender);
            
            return res.status(200).json({
                solar_date: result.solar_date,
                ilju: result.ilju,
                ilju_index: result.ilju_index,
                month_branch: result.month_branch,
                hour_branch: result.input_hour_type, // Maintain API contract (return input type as hour_branch field name per legacy)
                // Actually the API contract might expect the branch char or input string. 
                // Previous implementation returned `isYaja ? '자' : hourBranch` but comment said: "Prompt example output: '야자'".
                // My new `computeSaju` returns `input_hour_type` separately.
                // Let's stick to returning `birth_time_type` for `hour_branch` key as I decided previously.
                
                is_leap_month_applied: result.is_leap_month_applied,
                day_shifted_by_yaja: result.day_shifted_by_yaja
            });

        } catch (err: any) {
             if (err.message.startsWith('LEAP_MONTH_CONFIRM_REQUIRED')) {
                return res.status(400).json({ code: 'LEAP_MONTH_CONFIRM_REQUIRED', message: err.message });
            }
            if (err.message.startsWith('INVALID_LEAP_MONTH')) {
                return res.status(400).json({ code: 'INVALID_LEAP_MONTH', message: err.message });
            }
            throw err;
        }

    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}
