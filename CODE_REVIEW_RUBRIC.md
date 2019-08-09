# Code Review Rubric
Reference: https://github.com/accesscode-2-1/user-manual/blob/master/code-review-rubric.md

<table>
  <thead>
      <tr>
        <td>Criterion</td>
        <td>Excellent</td>
        <td>Good</td>
        <td>Adequate</td>
        <td>Developing</td>
      </tr>
  </thead>
  <tbody>
    <tr>
      <td>Readability</td>
      <td><!-- Excellent --></td>
      <td><!-- Good --></td>
      <td><!-- Adequate --></td>
      <td><!-- Developing --></td>
    </tr>
    <tr>
      <td>Maintainable</td>
      <td><!-- Excellent --></td>
      <td><!-- Good --></td>
      <td><!-- Adequate --></td>
      <td><!-- Developing --></td>
    </tr>
    <tr>
      <td>Low Barrier to Entry</td>
      <td><!-- Excellent --></td>
      <td><!-- Good --></td>
      <td><!-- Adequate --></td>
      <td><!-- Developing --></td>
    </tr>
    <tr>
      <td>Performance</td>
      <td><!-- Excellent --></td>
      <td><!-- Good --></td>
      <td><!-- Adequate --></td>
      <td><!-- Developing --></td>
    </tr>
    <tr>
      <td>Efficiency</td>
      <td><!-- Excellent --></td>
      <td><!-- Good --></td>
      <td><!-- Adequate --></td>
      <td><!-- Developing --></td>
    </tr>
    <tr>
      <td>Meets Business Goals</td>
      <td><!-- Excellent --></td>
      <td><!-- Good --></td>
      <td><!-- Adequate --></td>
      <td><!-- Developing --></td>
    </tr>
    <tr>
      <td>Addresses Edge Cases</td>
      <td><!-- Excellent --></td>
      <td><!-- Good --></td>
      <td><!-- Adequate --></td>
      <td><!-- Developing --></td>
    </tr>
    <tr>
      <td>Resilient</td>
      <td><!-- Excellent --></td>
      <td><!-- Good --></td>
      <td><!-- Adequate --></td>
      <td><!-- Developing --></td>
    </tr>
  </tbody>
</table>

# Description

## Readability
With our build process, minification and optimizations can happen programmatically as part of a task runner. To that end, source files should prioritize a developer touching the file the first time with limited knowledge of the system at large.

### Human-readable

* Avoids jargon unless documented
* Avoids shorthand/acronyms unless documented
* Chunks related logic into well-named functions
* Chunks computed values into well-named variables

```
// Bad
if ((!isLoading && results.length === 0) || isError) {
  ...
}
```

```
// Good
const noResults = !isLoading && results.length === 0;

if (noResults || isError) {
  ...
}
```

* Use white-space liberally to help dynamic values stand out


```
// Bad
function({value}){
  return value;
};
```
```
// Good
function ({ value }) {
  return value;
};
```

### Consistency

* Style and code linting

### Know where your values come from

Conventions around variable naming help a code reader know where a variable comes from without having to search for the variable declaration within the file.

#### Local constants

All-caps snake-case

```
const LOCAL_CONSTANT_NAME = "constant value";
```

#### Imported constants

camelCase

```
import constantName from './pathTo/constant';
```

#### props / state

Destructured at the top of the function that is using them. CamelCased. Because functions should have narrow focus, few keys should be pulled out of props. A good rule of thumb is that you ought to be able to see the entire content of the function and the destructured props without having to scroll.

```
const {
  propA,
  propB,
} = this.props;
```

#### actions

Wrapped in an actions object when bound to dispatch. This helps to distinguish functions that touch the application state from other functions.

```
this.props.actions.importedAction();
```

#### class methods

Bound to this, these are easy to distinguish from functions that are passed in as props.

```
this.classMethod
```

#### event handling 

Props that are triggered by an event are passed to a component as onEvent. Functions that handle events are named as handleEvent. This makes it easy to know when a component is calling a function that is being passed in vs. when a component is calling a function on itself. It further helps when a component both handles an event itself and then calls a passed in handler for the same event.

### Declarative programming

Functional programming > Object-oriented/procedural programming

* Branch logic into related chunks
* Compose single-focus functions with human-readable names that describe intent
* Self-documenting
* Easy to code-review because the purpose of the code is clear without requiring additional documentation


## Maintainability

* Single focus functions
* Separation of concerns
* Reduce the number of branches that must be touched to make an update
* Use consistent shaping and robust defaults when constructing configurations
* Accessing values from a configuration object should always behave the same for each configuration, or the case should be handled dynamically

## Low Barrier to Entry

Does not require extensive knowledge about the overall system in order to contribute. If properties are closely related, namespace them. To assist with keeping closely-related variables together, a good namespacing convention is to go from least specific qualifier to most specific qualifier from left to right. For example, when working with exterior and interior colors, they might be named colorExterior and colorInterior. When working with start and end timestamps for an hourly search, they might be named timestampHourlyStart and timestampHourlyEnd.

## Performance

* Do not significantly increase bundle size.
* Avoid importing large third-party libraries for a portion of the functionality
* Roll your own utilities if necessary
* Take advantage of multiple entries and tree-shaking
* Avoid nested loops or iterating over a full set multiple times. If necessary, reduce the set size at each iteration by as much as possible.
* Avoid unnecessary rerenders by avoiding nested prop structures, objects, and arrays. Prefer primitives, which have consistent references and can be shallowly compared to take advantage of PureComponent optimizations.

## Efficiency
* Uses appropriate data structures
* Uses robust third-party solutions, such as lodash, when appropriate

## Meets Business Goals

* Satisfies acceptance criteria for scope of work
* Works in supported browsers
* Handles supported browsers

## Resilience

* Considers edge cases such as empty state, loading state, populated state, and extreme values, and server error
* Set sane defaults
* Avoid accessing deeply nested values without testing chain
* Consider breakpoints in the design
* Unit tests
* Integration tests
