import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, screen, fireEvent, waitFor } from '@/test-utils';
import CoachesPage from '@/pages/admin/coaches/index';
import { createMockCoach } from '@/test-utils';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Admin Coaches Page', () => {
  const mockCoaches = [
    createMockCoach({ id: '1', firstName: 'علی', lastName: 'محمدی', email: 'ali@example.com' }),
    createMockCoach({ id: '2', firstName: 'رضا', lastName: 'احمدی', email: 'reza@example.com' }),
  ];

  beforeEach(() => {
    vi.resetAllMocks();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockCoaches,
    });
  });

  it('renders coaches page with title', async () => {
    renderWithProviders(<CoachesPage />);
    
    await waitFor(() => {
      expect(screen.getByText('مدیریت مربیان')).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    const { queryByText } = renderWithProviders(<CoachesPage />);
    
    expect(queryByText('مدیریت مربیان')).not.toBeInTheDocument();
    // Loading spinner should be visible
  });

  it('displays coaches in table after loading', async () => {
    renderWithProviders(<CoachesPage />);
    
    await waitFor(() => {
      expect(screen.getByText('علی محمدی')).toBeInTheDocument();
      expect(screen.getByText('رضا احمدی')).toBeInTheDocument();
    });
  });

  it('shows empty state when no coaches', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });
    
    renderWithProviders(<CoachesPage />);
    
    await waitFor(() => {
      expect(screen.getByText('هیچ مربیی یافت نشد')).toBeInTheDocument();
    });
  });

  it('has add new coach button', async () => {
    renderWithProviders(<CoachesPage />);
    
    await waitFor(() => {
      expect(screen.getByText('افزودن مربی جدید')).toBeInTheDocument();
    });
  });

  it('displays coach details in table', async () => {
    renderWithProviders(<CoachesPage />);
    
    await waitFor(() => {
      expect(screen.getByText('مربی فیفا، تخصص در نوجوانان')).toBeInTheDocument();
      expect(screen.getByText('10 سال')).toBeInTheDocument();
      expect(screen.getByText('4.8')).toBeInTheDocument();
      expect(screen.getByText('150')).toBeInTheDocument();
      expect(screen.getByText('فعال')).toBeInTheDocument();
    });
  });

  it('calls delete API when delete button clicked', async () => {
    const deleteMock = vi.fn().mockResolvedValue({ ok: true });
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: async () => mockCoaches })
      .mockResolvedValueOnce({ ok: true });
    
    renderWithProviders(<CoachesPage />);
    
    await waitFor(() => {
      expect(screen.getByText('علی محمدی')).toBeInTheDocument();
    });

    // Click delete button for first coach
    const deleteButtons = screen.getAllByLabelText(/حذف/i);
    fireEvent.click(deleteButtons[0]);
    
    // Confirm dialog
    await waitFor(() => {
      expect(deleteMock).toHaveBeenCalledWith('/api/admin/coaches/1', { method: 'DELETE' });
    });
  });

  it('removes coach from list after successful delete', async () => {
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: async () => mockCoaches })
      .mockResolvedValueOnce({ ok: true });
    
    renderWithProviders(<CoachesPage />);
    
    await waitFor(() => {
      expect(screen.getByText('علی محمدی')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByLabelText(/حذف/i);
    fireEvent.click(deleteButtons[0]);
    
    await waitFor(() => {
      expect(screen.queryByText('علی محمدی')).not.toBeInTheDocument();
      expect(screen.getByText('رضا احمدی')).toBeInTheDocument();
    });
  });
});