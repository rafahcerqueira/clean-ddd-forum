import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswerRepository } from '../repositories/answer-repository'
import { Answer } from '../entities/answer'

const fakeAnswerRepository: AnswerRepository = {
    create: async (answer: Answer) => {
        return;
    }
}

test('create an answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

    const answer = await answerQuestion.execute({
        questionId: '1',
        instructorId: '2',
        content: 'New response'
    })

    expect(answer.content).toEqual('New response')
})