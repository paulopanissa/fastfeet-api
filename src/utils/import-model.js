import { join } from 'path';
import { readdirSync, statSync } from 'fs';

export default function importModel(base) {
  const defaultPath = `${__dirname}/../app/models/`;

  base = base || defaultPath;

  const result = [];

  const flatten = arr =>
    arr.reduce(
      (acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val),
      []
    );

  // eslint-disable-next-line no-extend-native
  Array.prototype.flatten = function() {
    return flatten(this);
  };

  const walkSync = dir =>
    readdirSync(dir)
      .map(file =>
        statSync(join(dir, file)).isDirectory()
          ? walkSync(join(dir, file))
          : join(dir, file).replace(/\\/g, '/')
      )
      .flatten();

  walkSync(base)
    .filter(file => file.slice(-3) === '.js')
    .forEach(file => result.push(require(file).default)); // eslint-disable-line

  return result;
}
