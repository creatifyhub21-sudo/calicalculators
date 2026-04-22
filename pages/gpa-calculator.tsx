import { useMemo, useState } from 'react';
import { BarChart } from '../components/ChartComponents';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import CalculatorPageShell from '../components/CalculatorPageShell';
import CalculatorInputPanel from '../components/CalculatorInputPanel';
import ResultHero from '../components/ResultHero';
import DetailCardGrid from '../components/DetailCardGrid';
import FormulaBlock from '../components/FormulaBlock';
import Steps from '../components/Steps';
import AboutResult from '../components/AboutResult';
import EmptyResultState from '../components/EmptyResultState';
import { calculateGPA, letterToPoints } from '../calculators/gpa';

export default function GPACalculator() {
  interface CourseRow { credits: string; grade: string; }
  const [courses, setCourses] = useState<CourseRow[]>([{ credits: '', grade: 'A' }]);
  const [result, setResult] = useState<number | null>(null);
  const [summary, setSummary] = useState<{ totalCredits: number; totalPoints: number } | null>(null);
  const [error, setError] = useState('');

  const gradeOptions = ['A','A-','B+','B','B-','C+','C','C-','D+','D','D-','F'].map((g) => ({ value: g, label: g }));

  const handleChange = (index: number, field: keyof CourseRow, value: string) => {
    setCourses((prev) => prev.map((c, i) => (i === index ? { ...c, [field]: value } : c)));
  };

  const addCourse = () => setCourses((prev) => [...prev, { credits: '', grade: 'A' }]);
  const removeCourse = (index: number) => setCourses((prev) => prev.filter((_, i) => i !== index));

  const parsedCourses = useMemo(() => {
    try {
      return courses.map((c) => ({
        credits: parseFloat(c.credits),
        grade: c.grade,
        points: letterToPoints(c.grade),
      }));
    } catch {
      return [];
    }
  }, [courses]);

  const calculate = () => {
    setError('');
    setResult(null);
    try {
      const parsed = courses.map((c) => {
        const credits = parseFloat(c.credits);
        if (isNaN(credits) || credits <= 0) throw new Error('Please enter valid credit hours for all courses.');
        return { credits, grade: c.grade };
      });
      const gpa = calculateGPA(parsed);
      const totalCredits = parsed.reduce((s, c) => s + c.credits, 0);
      const totalPoints = parsed.reduce((s, c) => s + c.credits * letterToPoints(c.grade), 0);
      setResult(gpa);
      setSummary({ totalCredits, totalPoints });
    } catch (err: any) {
      setError(err.message || 'Invalid input');
    }
  };

  const steps = result !== null && summary ? [
    `Convert each letter grade into grade points on a 4.0 scale.`,
    `Multiply each course's grade points by its credit hours to get quality points.`,
    `Add all quality points to get ${summary.totalPoints.toFixed(2)} total grade points.`,
    `Add all credits to get ${summary.totalCredits.toFixed(2)} total credits.`,
    `Divide total grade points by total credits: ${summary.totalPoints.toFixed(2)} ÷ ${summary.totalCredits.toFixed(2)} = ${result.toFixed(2)}.`,
  ] : [];

  return (
    <CalculatorPageShell
      category="Other Calculators"
      title="GPA Calculator"
      description="Calculate grade point average from course credits and letter grades using a standard 4.0 scale."
      left={
        <CalculatorInputPanel
          description="Add as many courses as you need, then calculate your GPA."
          actions={
            <>
              <Button onClick={calculate}>Calculate GPA</Button>
              <button type="button" onClick={addCourse} className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">+ Add Course</button>
            </>
          }
          error={error}
        >
          {courses.map((course, index) => (
            <div key={index} className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]">
              <Input label={`Credits (Course ${index + 1})`} type="number" value={course.credits} onChange={(e) => handleChange(index, 'credits', e.target.value)} />
              <Select label="Grade" value={course.grade} onChange={(e) => handleChange(index, 'grade', e.target.value)} options={gradeOptions} />
              {courses.length > 1 ? (
                <button type="button" onClick={() => removeCourse(index)} className="rounded-2xl border border-rose-200 bg-white px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50">
                  Remove
                </button>
              ) : <div />}
            </div>
          ))}
        </CalculatorInputPanel>
      }
      right={
        result === null || !summary ? (
          <EmptyResultState text="Your GPA summary, course-weight chart, and explanation will appear here after calculation." />
        ) : (
          <>
            <ResultHero title="Estimated GPA" value={result.toFixed(2)} />
            <DetailCardGrid items={[
              { title: 'Total credits', value: summary.totalCredits.toFixed(2) },
              { title: 'Quality points', value: summary.totalPoints.toFixed(2), hint: 'Credit hours multiplied by grade points.' },
              { title: 'Courses', value: courses.length },
            ]} />
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Course credit distribution</h3>
              <div className="chart-card mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <BarChart
                  data={{
                    labels: parsedCourses.map((_, idx) => `Course ${idx + 1}`),
                    datasets: [{ label: 'Credits', data: parsedCourses.map((c) => isNaN(c.credits) ? 0 : c.credits), backgroundColor: 'rgba(6,43,82,0.9)', borderRadius: 8 }],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, title: { display: true, text: 'Credits' } } } }}
                />
              </div>
            </div>
            <FormulaBlock formula="GPA = Σ(Grade Points × Credits) ÷ Σ(Credits)" explanation="Each course contributes according to both its grade and its credit hours." />
            <Steps steps={steps} />
            <AboutResult paragraphs={[
              'A GPA is weighted by credits, so a strong grade in a high-credit course affects the average more than the same grade in a low-credit course.',
              'Different schools can use different grade-point scales. This calculator uses a common 4.0-style mapping.',
            ]} />
          </>
        )
      }
    />
  );
}
