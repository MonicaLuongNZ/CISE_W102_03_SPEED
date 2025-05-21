import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AnalystPage from '@/app/analyst-page/page';
import '@testing-library/jest-dom';

const mockArticle = {
  _id: '123',
  title: 'Test Article',
  authors: 'Jane Doe',
  journal_name: 'Test Journal',
  published_year: '2024',
};

describe('AnalystPage Feature', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock) = jest.fn().mockImplementation((url: string) => {
      if (url.includes('/api/articles/status/approved')) {
        const body = JSON.stringify([mockArticle]);
        return Promise.resolve(new Response(body, {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }));
      }

      if (url.includes('/analyze')) {
        const body = JSON.stringify({});
        return Promise.resolve(new Response(body, {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }));
      }

      return Promise.reject(new Error('Unknown endpoint'));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders approved articles in a table', async () => {
    render(<AnalystPage />);
    expect(await screen.findByText('Test Article')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Test Journal')).toBeInTheDocument();
  });

  it('submits analysis form successfully', async () => {
    render(<AnalystPage />);

    fireEvent.click(await screen.findByText('Analyze'));

    fireEvent.change(screen.getByLabelText(/Evidence Type/i), {
      target: { value: 'Interview' },
    });
    fireEvent.change(screen.getByLabelText(/Source/i), {
      target: { value: 'Internal' },
    });
    fireEvent.change(screen.getByLabelText(/Summary/i), {
      target: { value: 'Short summary' },
    });
    fireEvent.change(screen.getByLabelText(/Tags/i), {
      target: { value: 'tag1, tag2' },
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/analyze'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });
  });
});
