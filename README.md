# NestJS GraphQL E2E Plugin Example

NestJS comes with a great plugin for working with GraphQL so that you don't
have to decorate each and every property with `@Field()`. This makes development
much easier, but it bring a challenge to testing. As Nest advocates for using Jest
(and there's nothing wrong with that) to use Jest with Typescript we need to use
the [ts-jest](https://github.com/kulshekhar/ts-jest) package. The problem here
is that `ts-jest` uses Typescript's compiler when it comes to transforming the
ts files into js files. Nest uses Typescript's compiler as well, but with a
couple of tweaks to it to work with the auto generation of GraphQL models that
are properly decorated.

## The Problem

Running E2E tests is now an issue using the NestJS GraphQL CLI PLugin because
the models are no longer decorated with the proper values for the `GraphQLModule`
to function as expected.

## The Solution

Instead of using `ts-jest` for E2E tests, it helps to build a script to compile
**all** of your ts files (yes, spec files included) and turn them into js files
so that jest can run the test files directly. The best way to go about this is
to create a specific tsconfig file for your E2E tests, and a `pretest:e2e` script
that does the build when you run the `test:e2e` script in the `package.json`. The
tsconfig could look something like this:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "dist-test"
  },
  "include": ["src", "test"]
}
```

and the `pretest:e2e` script could be something like this

```json
"pretest:e2e": "nest build -p tsconfig.test.json && cp ./test/jest-e2e.json ./dist-test/test/",
"test:e2e": "jest --config ./dist-test/test/jest-e2e.json"
```

Make sure to also update the `test/jest-e2e.json` to no longer reference any
ts files, or make use of `ts-jest

```json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.js$"
}
```

And now you should be able to run `<pkg manager run> test:e2e` and have a full
test execution of your E2E tests, including Nest building the models for GraphQL.

Enjoy!
