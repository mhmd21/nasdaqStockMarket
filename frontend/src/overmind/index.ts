import { IContext } from 'overmind';
import {
  createStateHook,
  createActionsHook,
  createEffectsHook,
  createReactionHook,
} from 'overmind-react';

import state from './state';
// eslint-disable-next-line import/no-cycle
import * as actions from './actions';
import * as effects from './effects';

export const config = {
  state,
  actions,
  effects,
};

export const useAppState = createStateHook<Context>();
export const useActions = createActionsHook<Context>();
export const useEffects = createEffectsHook<Context>();
export const useReaction = createReactionHook<Context>();

export type Context = IContext<typeof config>;
