import {Subject} from 'rxjs/Rx'

const subjectsList = {};

const getRxSubject = (name) => subjectsList[name] || (subjectsList[name] = new Subject());
const callSubject = (name, method, data) => getRxSubject(name)[method](data);

const emit = (name, data) => callSubject(name, 'next', data);
const subscribe = (name, handler, filter) => getRxSubject(name)
      .filter((event) => filter ? filter(event) : true)
      .subscribe(handler)

export * from './eventsList';

export const Emitter = {
  emit,
  subscribe
}
