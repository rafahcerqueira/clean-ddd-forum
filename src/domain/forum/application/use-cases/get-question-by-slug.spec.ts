import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-object/slug'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let getQuestionBySlug: GetQuestionBySlugUseCase

describe('Get question by slug', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    getQuestionBySlug = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-title-question'),
    })

    await inMemoryQuestionRepository.create(newQuestion)

    const { question } = await getQuestionBySlug.execute({
      slug: 'example-title-question',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})
