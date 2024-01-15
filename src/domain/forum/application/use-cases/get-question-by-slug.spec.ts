import { Question } from '../../enterprise/entities/question'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from '../../enterprise/entities/value-object/slug'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let getQuestionBySlug: GetQuestionBySlugUseCase

describe('Get question by slug', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    getQuestionBySlug = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityID(),
      title: 'Example Title Question',
      slug: Slug.create('example-title-question'),
      content: 'Example content',
    })

    inMemoryQuestionRepository.create(newQuestion)

    const { question } = await getQuestionBySlug.execute({
      slug: 'example-title-question',
    })

    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionRepository.items[0].id).toEqual(question.id)
  })
})
