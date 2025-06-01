import { ReactNode } from "react";

export type Article = {
    _id?: string;
    title?: string;
    authors?: string;
    journal_name?: string;
    published_year?: number;
    volume?: string;
    number?: string;
    pages?: string;
    doi?: string;
    status?: 'pending' | 'approved' | 'rejected' | 'analyzed';
    se_practice?: string;
    claim?: string;
    result_of_evidence?: string;
    type_of_research?: string;
    type_of_participant?: string;
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
    se_practice:'',
    claim: '',
    result_of_evidence: '',
    type_of_research: '',
    type_of_participant:''
}
