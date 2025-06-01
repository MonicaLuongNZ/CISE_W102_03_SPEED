import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PublicPage from './public-page';

// Mock next/navigation to prevent actual navigation during tests
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

// Sample mock articles to be returned by fetch
const mockArticles = [
    {
        _id: '1',
        title: 'Test Article',
        authors: 'John Doe',
        journal_name: 'Test Journal',
        published_year: 2023,
        doi: '10.1234/test',
        se_practice: 'Agile',
        claim: 'Claim 1',
        result_of_evidence: 'Agree',
        type_of_research: 'Case Study',
        type_of_participant: 'Practitioner',
    },
    {
        _id: '2',
        title: 'Another Article',
        authors: 'Jane Smith',
        journal_name: 'Another Journal',
        published_year: 2022,
        doi: '10.5678/another',
        se_practice: 'DevOps',
        claim: 'Claim 2',
        result_of_evidence: 'Disagree',
        type_of_research: 'Experiment',
        type_of_participant: 'Student',
    },
];

// Mock global.fetch before each test to return mockArticles
beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(mockArticles),
        })
    ) as jest.Mock;
});

// Clear all mocks after each test
afterEach(() => {
    jest.clearAllMocks();
});

describe('PublicPage', () => {
    // Test that articles are rendered when fetched from backend
    it('renders articles fetched from backend', async () => {
        render(<PublicPage />);
        await waitFor(() => {
            expect(screen.getByText('Test Article')).toBeInTheDocument();
            expect(screen.getByText('Another Article')).toBeInTheDocument();
            expect(screen.getByText('Agree')).toBeInTheDocument();
            expect(screen.getByText('Disagree')).toBeInTheDocument();
            expect(screen.getByText('Experiment')).toBeInTheDocument();
            expect(screen.getByText('Case Study')).toBeInTheDocument();
            expect(screen.getByText('Practitioner')).toBeInTheDocument();
            expect(screen.getByText('Student')).toBeInTheDocument();
        });
        expect(screen.getByText('Article Title')).toBeInTheDocument();
    });

    // Test that "No articles found." is shown when no articles are returned
    it('shows "No articles found." when no articles are returned', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve([]),
            })
        );
        render(<PublicPage />);
        await waitFor(() => {
            expect(screen.getByText('No articles found.')).toBeInTheDocument();
        });
    });
});