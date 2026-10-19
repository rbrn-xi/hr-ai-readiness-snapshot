// Lets Node's built-in test runner load the app's TypeScript sources directly.
// The app uses extensionless imports ("../content/questions"), which Vite
// resolves but Node does not, so this hook retries relative imports with ".ts".
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`
      export async function resolve(specifier, context, next) {
        try {
          return await next(specifier, context);
        } catch (err) {
          if (specifier.startsWith(".") && !/\\.[cm]?[jt]sx?$/.test(specifier)) {
            return next(specifier + ".ts", context);
          }
          throw err;
        }
      }
    `),
);
