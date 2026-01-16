import Header from '@/components/layout/Header';
import ExamList from '@/components/toan/ExamList';
import StudyStats from '@/components/toan/StudyStats';
import ExamHistory from '@/components/toan/ExamHistory';

const SUBJECT_CONFIG: Record<string, { code: string; name: string; nameVi: string; description: string; gradient: string }> = {
  'toan': {
    code: 'MATH',
    name: 'Toán',
    nameVi: 'Toán',
    description: 'Luyện tập và kiểm tra kiến thức Toán học',
    gradient: 'from-blue-600 to-indigo-600'
  },
  'vatly': {
    code: 'PHYSICS',
    name: 'Vật lý',
    nameVi: 'Vật lý',
    description: 'Luyện tập và kiểm tra kiến thức Vật lý',
    gradient: 'from-purple-600 to-pink-600'
  },
  'hoa': {
    code: 'CHEMISTRY',
    name: 'Hóa học',
    nameVi: 'Hóa học',
    description: 'Luyện tập và kiểm tra kiến thức Hóa học',
    gradient: 'from-green-600 to-teal-600'
  },
  'sinh': {
    code: 'BIOLOGY',
    name: 'Sinh học',
    nameVi: 'Sinh học',
    description: 'Luyện tập và kiểm tra kiến thức Sinh học',
    gradient: 'from-emerald-600 to-green-600'
  }
};

export default function SubjectPage({ params }: { params: { subject: string } }) {
  const subjectSlug = params.subject;
  const subjectInfo = SUBJECT_CONFIG[subjectSlug];

  // If subject not found, show error
  if (!subjectInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Không tìm thấy môn học</h1>
          <p className="text-gray-600 mb-6">Môn học &quot;{subjectSlug}&quot; chưa được hỗ trợ</p>
          <a href="/toan" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Về trang Toán
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-6 py-8 max-w-[1600px]">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className={`text-4xl font-bold bg-gradient-to-r ${subjectInfo.gradient} bg-clip-text text-transparent mb-2`}>
            {subjectInfo.name}
          </h1>
          <p className="text-gray-600 text-lg">
            {subjectInfo.description}
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column - Exam List & History */}
          <div className="xl:col-span-7 space-y-8">
            <ExamList subjectCode={subjectInfo.code} />
            <ExamHistory subjectCode={subjectInfo.code} />
          </div>

          {/* Right Column - Study Stats */}
          <div className="xl:col-span-5">
            <StudyStats userName="Khánh Ly" subjectCode={subjectInfo.code} />
          </div>
        </div>
      </main>
    </div>
  );
}
