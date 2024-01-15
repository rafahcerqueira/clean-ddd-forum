import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let answerQuestion: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    answerQuestion = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to create an answer', async () => {
    const { answer } = await answerQuestion.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Question answer',
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.id)
  })
})
