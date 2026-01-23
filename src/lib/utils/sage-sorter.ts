
import rulesData from '../../../data/seed/variation_rules.json';

const ORDER_KR = rulesData.global_order_rule.zodiac_order_kr; // ["자", "축", ...]
const ORDER_EN = rulesData.global_order_rule.animals_order; // ["rat", "ox", ...]

export function getSageSortKey(sageSlug: string): number {
    // sageSlug format: "rat-sage", "ox-sage"
    const animal = sageSlug.split('-')[0];
    const index = ORDER_EN.indexOf(animal);
    return index === -1 ? 999 : index;
}

export function sortSages<T extends { slug: string }>(sages: T[]): T[] {
    return [...sages].sort((a, b) => getSageSortKey(a.slug) - getSageSortKey(b.slug));
}

export function getZodiacOrder(): string[] {
    return ORDER_EN;
}
