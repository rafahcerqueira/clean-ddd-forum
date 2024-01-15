import { QuestionRepository } from '../repositories/question-repository'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditQuestionUseCaseResponse {}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) throw new Error('Question not found!')

    if (authorId !== question.authorId.toString())
      throw new Error('Not allowed')

    question.title = title
    question.content = content

    await this.questionRepository.update(question)

    return {}
  }
}
