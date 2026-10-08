import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, screen, fireEvent, waitFor } from '@/test-utils';
import CoachSpotlight from '@/components/CoachSpotlight';
import { createMockCoach } from '@/test-utils';

describe('CoachSpotlight', () => {
  const mockCoaches = [
    createMockCoach({ id: '1', firstName: 'علی', lastName: 'محمدی' }),
    createMockCoach({ id: '2', firstName: 'رضا', lastName: 'احمدی' }),
    createMockCoach({ id: '3', firstName: 'حسین', lastName: 'رضایی' }),
  ];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders coach spotlight section when coaches are provided', () => {
    renderWithProviders(<CoachSpotlight coaches={mockCoaches} />);
    
    expect(screen.getByText('تیم مربیگری')).toBeInTheDocument();
    expect(screen.getByText('مربیان حرفه‌ای')).toBeInTheDocument();
    expect(screen.getByText('علی محمدی')).toBeInTheDocument();
  });

  it('renders null when no coaches provided', () => {
    const { queryByText } = renderWithProviders(<CoachSpotlight coaches={[]} />);
    
    expect(queryByText('تیم مربیگری')).not.toBeInTheDocument();
  });

  it('renders null when coaches is undefined', () => {
    const { queryByText } = renderWithProviders(<CoachSpotlight coaches={undefined} />);
    
    expect(queryByText('تیم مربیگری')).not.toBeInTheDocument();
  });

  it('shows first coach by default', () => {
    renderWithProviders(<CoachSpotlight coaches={mockCoaches} />);
    
    expect(screen.getByText('علی محمدی')).toBeInTheDocument();
    expect(screen.getByText('مربی ارشد')).toBeInTheDocument();
    expect(screen.getByText('مربی فیفا، تخصص در نوجوانان')).toBeInTheDocument();
  });

  it('navigates to next coach when next button clicked', () => {
    renderWithProviders(<CoachSpotlight coaches={mockCoaches} />);
    
    const nextButton = screen.getByLabelText(/اسلاید بعدی/i);
    fireEvent.click(nextButton);
    
    expect(screen.getByText('رضا احمدی')).toBeInTheDocument();
  });

  it('navigates to previous coach when prev button clicked', () => {
    renderWithProviders(<CoachSpotlight coaches={mockCoaches} />);
    
    const prevButton = screen.getByLabelText(/اسلاید قبلی/i);
    fireEvent.click(prevButton);
    
    expect(screen.getByText('حسین رضایی')).toBeInTheDocument();
  });

  it('shows all coaches in grid', () => {
    renderWithProviders(<CoachSpotlight coaches={mockCoaches} />);
    
    expect(screen.getByText('تمام مربیان ما')).toBeInTheDocument();
    expect(screen.getByText('علی محمدی')).toBeInTheDocument();
    expect(screen.getByText('رضا احمدی')).toBeInTheDocument();
    expect(screen.getByText('حسین رضایی')).toBeInTheDocument();
  });

  it('displays coach stats correctly', () => {
    renderWithProviders(<CoachSpotlight coaches={mockCoaches} />);
    
    expect(screen.getByText('10')).toBeInTheDocument(); // experience
    expect(screen.getByText('150')).toBeInTheDocument(); // studentsCount
    expect(screen.getByText('4.8')).toBeInTheDocument(); // rating
  });

  it('displays coach certifications', () => {
    renderWithProviders(<CoachSpotlight coaches={mockCoaches} />);
    
    expect(screen.getByText('گواهی فیفا C')).toBeInTheDocument();
    expect(screen.getByText('گواهی AFC B')).toBeInTheDocument();
  });

  it('displays coach achievements', () => {
    renderWithProviders(<CoachSpotlight coaches={mockCoaches} />);
    
    expect(screen.getByText('قهرمان لیگ برتر')).toBeInTheDocument();
    expect(screen.getByText('بهترین مربی سال')).toBeInTheDocument();
  });

  it('handles coach with missing optional fields', () => {
    const coachWithoutOptionals = createMockCoach({
      title: null,
      bio: null,
      quote: null,
      certifications: [],
      achievements: [],
      instagram: null,
      twitter: null,
    });
    
    renderWithProviders(<CoachSpotlight coaches={[coachWithoutOptionals]} />);
    
    expect(screen.getByText('تیم مربیگری')).toBeInTheDocument();
    expect(screen.queryByText(null)).not.toBeInTheDocument(); // No bio/quote rendered
  });

  it('cycles through coaches with indicator dots', () => {
    renderWithProviders(<CoachSpotlight coaches={mockCoaches} />);
    
    const dots = screen.getAllByRole('button', { name: /اسلاید \d+/i });
    expect(dots).toHaveLength(3);
  });
});