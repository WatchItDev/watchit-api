import 'reflect-metadata'
import { onCall }   from 'firebase-functions/v2/https'
import { HttpsError } from 'firebase-functions/v1/https'

import { enhanceFunction }  from '../../manager'

import type {
  Comment,
  CreateCommentInput,
  UpdateCommentInput,
} from '../../../schema/types'
import { Address } from "../../../types";

export const commentsCreate = onCall(
  { region: 'us-central1' },
  enhanceFunction(async ({ ds }, req): Promise<{ comment: Comment }> => {
    const input = req.data as CreateCommentInput & Address

    const comment = await ds.Comments.createComment(input.address, input)
    console.log(`🆕 comment created ${comment.id}`)
    return { comment }
  })
)

export const commentsUpdate = onCall(
  { region: 'us-central1' },
  enhanceFunction(async ({ ds }, req): Promise<{ comment: Comment | null }> => {
    const input = req.data as UpdateCommentInput

    const existing = await ds.Comments.getComment(input.commentId)
    if (!existing) {
      throw new HttpsError('not-found', 'comment not found')
    }

    const comment = await ds.Comments.updateComment(input)
    console.log(`✏️  comment updated ${input.commentId}`)
    return { comment }
  })
)

export const commentsHide = onCall(
  { region: 'us-central1' },
  enhanceFunction(async ({ ds }, req): Promise<{ success: boolean }> => {
    const { commentId } = req.data as { commentId: string }

    await ds.Comments.hideComment(commentId)
    console.log(`❌ comment hidden ${commentId}`)
    return { success: true }
  })
)
