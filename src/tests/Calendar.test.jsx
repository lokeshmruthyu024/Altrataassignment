import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calendar from '../Calendar/Calendar';


describe('Calendar Component', () => {
  it('renders the correct month and year', () => {
    render(<Calendar date={new Date(2025, 10, 15)} />);
    expect(screen.getByText('November 2025')).toBeInTheDocument();
  });

  it('highlights the selected date', () => {
    render(<Calendar date={new Date(2025, 10, 15)} />);
    const day15 = screen.getByText('15');
    expect(day15.className).toContain('selected');
  });

  it('displays all days of the week', () => {
    render(<Calendar date={new Date(2025, 10, 1)} />);
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it('aligns dates correctly when month starts mid-week', () => {
    render(<Calendar date={new Date(2025, 10, 1)} />);
    const weekRows = screen.getAllByRole('row');


    const firstWeek = weekRows[1];
    const cells = Array.from(firstWeek.children).map(cell =>
      cell.textContent?.trim() || ''
    );
    expect(cells).toEqual(['', '', '', '', '', '', '1']);
  });

  it('works with February (short month)', () => {
    render(<Calendar date={new Date(2025, 1, 20)} />);
    expect(screen.getByText('February 2025')).toBeInTheDocument();
    const day20 = screen.getByText('20');
    expect(day20.className).toContain('selected');
  });
});