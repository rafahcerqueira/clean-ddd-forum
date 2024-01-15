import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let editQuestion: EditQuestionUseCase

describe('Edit question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    editQuestion = new EditQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionRepository.create(newQuestion)

    await editQuestion.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-1',
      title: 'Title changed',
      content: 'Changed content',
    })

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'Title changed',
      content: 'Changed content',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionRepository.create(newQuestion)

    expect(() => {
      return editQuestion.execute({
        questionId: newQuestion.id.toValue(),
        authorId: 'author-2',
        title: 'Title changed',
        content: 'Changed content',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
