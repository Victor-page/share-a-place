export class YmapsRequiredError extends Error {
  constructor() {
    super('Could not load maps library - please try again later!');
    this.name = 'YmapsRequiredError';
  }
}
