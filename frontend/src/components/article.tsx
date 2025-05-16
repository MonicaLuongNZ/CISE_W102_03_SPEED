import { ReactNode } from "react";

export type Article = {
    evidence: ReactNode;
    claim: ReactNode;
    status: ReactNode;
    _id?: string;
    title?: string;
    authors?: string;
    journal_name?: string;
    published_year?: number;
    volume?: string;
    number?: string;
    pages?: string;
    doi?: string;
};

export const DefaultEmptyArticle: Article = {
    _id: undefined,
    title: '',
    authors: '',
    journal_name: '',
    published_year: undefined,
    volume: '',
    number: '',
    pages: '',
    doi: '',
    status: undefined,
    evidence: undefined,
    claim: undefined
}
