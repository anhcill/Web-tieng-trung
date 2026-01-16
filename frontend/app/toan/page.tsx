import Header from '@/components/layout/Header';
import ExamList from '@/components/toan/ExamList';
import StudyStats from '@/components/toan/StudyStats';
import ExamHistory from '@/components/toan/ExamHistory';

export default function ToanPage() {
  const subjectCode = 'MATH';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-6 py-8 max-w-[1600px]">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Toán
          </h1>
          <p className="text-gray-600 text-lg">
            Luyện tập và kiểm tra kiến thức Toán học
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column - Exam List & History */}
          <div className="xl:col-span-7 space-y-8">
            <ExamList subjectCode={subjectCode} />
            <ExamHistory subjectCode={subjectCode} />
          </div>

          {/* Right Column - Study Stats */}
          <div className="xl:col-span-5">
            <StudyStats userName="Khánh Ly" subjectCode={subjectCode} />
          </div>
        </div>
      </main>
    </div>
  );
}
