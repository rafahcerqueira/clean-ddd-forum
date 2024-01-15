import { AnswerRepository } from '../repositories/answer-repository'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) throw new Error('Answer not found!')

    if (authorId !== answer.authorId.toString()) throw new Error('Not allowed')

    await this.answerRepository.delete(answer)

    return {}
  }
}
