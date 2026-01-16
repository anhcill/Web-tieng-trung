const pool = require('./src/config/database');

async function testDatabase() {
  try {
    // Test 1: Check exams
    const examsResult = await pool.query('SELECT id, code, title FROM exams LIMIT 5');
    console.log('\n=== EXAMS ===');
    console.log(examsResult.rows);

    if (examsResult.rows.length > 0) {
      const examId = examsResult.rows[0].id;

      // Test 2: Check questions for first exam
      const questionsResult = await pool.query(
        'SELECT id, question_number, question_text FROM questions WHERE exam_id = $1 LIMIT 3',
        [examId]
      );
      console.log('\n=== QUESTIONS ===');
      console.log(questionsResult.rows);

      if (questionsResult.rows.length > 0) {
        const questionId = questionsResult.rows[0].id;

        // Test 3: Check answers for first question
        const answersResult = await pool.query(
          'SELECT id, answer_key, answer_text, is_correct FROM answers WHERE question_id = $1',
          [questionId]
        );
        console.log('\n=== ANSWERS ===');
        console.log(answersResult.rows);
      }
    }

    // Test 4: Check exam_attempts
    const attemptsResult = await pool.query(
      'SELECT id, user_id, exam_id, status FROM exam_attempts ORDER BY id DESC LIMIT 5'
    );
    console.log('\n=== EXAM ATTEMPTS ===');
    console.log(attemptsResult.rows);

    if (attemptsResult.rows.length > 0) {
      const attemptId = attemptsResult.rows[0].id;

      // Test 5: Check user_answers
      const userAnswersResult = await pool.query(
        'SELECT * FROM user_answers WHERE attempt_id = $1',
        [attemptId]
      );
      console.log('\n=== USER ANSWERS ===');
      console.log(userAnswersResult.rows);
    }

    process.exit(0);
  } catch (error) {
    console.error('Database test error:', error);
    process.exit(1);
  }
}

testDatabase();
