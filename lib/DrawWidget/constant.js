"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.drawToolList = void 0;
var ControlICONS = {
  Point: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAARxJREFUWEft1LEuREEYxfHf9jRLIRIqnUSpoOEFREUh3kFBo6LYKEj0StEp8ARUEvUmOg2NSHT07pW73XK/mZBtZto5c87/npn7dYx4dUacrwCUBkoDpYHcBiYwjTG84g2fOUMtB+AYu0PC9nGUCpEK8IyZX0IOq72DFIgUgFusBMw3cBnQfUuiAOu4ippivLqmj4g+ClDfby9i2Gjm8BTRRwFusBYxbDTLuI/oowCn2IkYNpoF9CP6KMA2ziOGjWYS7xF9FKDbfFE9fNrWSTWU9tpEg/0oQK3fwkWL8Qtmo+Epv+HAc6kawWfVfz4/JOQOqynhOQD1mXr+b2IRU3jAI65Tw3MBcnJ+PJPyBv40OOcRFoDSQGngXxr4App1HCGF2UdQAAAAAElFTkSuQmCC',
  Line: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAp1JREFUWEe9l0uIjlEYx3+zsZGFsqCUe0hEiXFJ7iklxUxZMcVIE7IZFm4TJWYzLolQLKYmTKLIJYaYRolyySULpMRmFkwoC85/Oq/ejvO93zlHvWf7vc95fu/z/J//8341lHuWArOBJ8AVpa4pMf9eYE8u311gQVkAdcB5z8vWlwXgvn3G0lIWwFjgracC48oCUG63CmeBhmoAs4CJwC/gKtD7H6JtBg4C14FNwPtqU6CRueEkHGqCvyRC3JHqge3AoeyOogo8BGY6yY6aKmxJABicq94M4FEIwFdgkJPsmglengCwErgEPAem5OOLKnAfmOska7FiimU4AWwEjgBbQwHmA12eTCkQEtwIQJW4HApQC/QALwE52aScm8VAzAEeWA0MMXb8OxRgH7ATOAOst0F5Sw2FyMavE1jtVrRIA9pY04ANwOlcYCzETWAJ0AicCgVQv9S3PjuKakP+hELIxLLYYcDnUACVXLS3ABmS74RAZPdIS/oO+OdUaoFmVoqVDnYXzFw1CPn9WmAXsD8UYKBV7ABgYYVRDGmHbFvqHwNMBZ6GAqyws/oGmBDoOL5KrAIumo33ARhZ6R5fCw5bvz9nhLguEECPuRDaI8uAY8DmGAB9OOgDYo2pQEcEgAuRhX4zK1im5k5S/+9uBaTUbrMyfxhyudb3SACN2idPjOslfx9xAaR4OdxtI6DFkcn1uDadT2xNwPEQEd4D5tmNpc2Vcj4a5xzuBKqy8oJCHxgPvLZPjDbz+y4lux27VmAR8Mr6iOzYe7IWSO3606BxeQFMTkweHSaAHcABJ7LerN8L0bclBAjgmeeNHwPTE+6LDhGAeu06lTbhqOjbEgIEcNLu6nx4G7At4b7okEyEEqBW50+g3dyifzGlnD8S4H8a/N0aLAAAAABJRU5ErkJggg==',
  Trash: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAARRJREFUWEftl7EOwVAUhr8+hcRksrAIicGA1c4rmKxW3sDA5AnEUzDYDCLsFryAnV7pTarpbc/VJl3uHU//85+vf9vk1KPg4xU8HxuAOdAFekLoHbD3tarPeGwALkBNOFzLrkA9L4B3YCSFFumlZmq2yDB0tyK9CWABDICqZeRp8gdwAEZaGAegXppZmlPG62tgrDziAO5AOeMASbua8YwD0M9OYpJF0/c/6V3SSxgF0dq86l94B+AScAm4BFwCLgGXgE0CeiNWm274mOqtQHSM6H9m2gDcAqNKxNBUNy0rYgBF3syy8sT0noBGuJ6UwBDY5gwwAVZSAKXrAFOgDZT+hHkBZ2AJbKIeNj8mf85Pbisc4AOhrl0h7ouTbAAAAABJRU5ErkJggg==',
  Rectangle: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAUxJREFUWEftV7FKA0EUnAf+gaD4Dfv2H0xpK9iLhaJE0S/wbCwN8bCUoKWNYGljPsHiXRchRT7hCrvRjRcIiyEcbNBiD67ZNzczN8fBGwEA7/0eyWsAE5KDqqoew3nqy3t/SDLc6yLyYGaFqGoB4DISuwrDlAZU9QDAfcR5LN57I+lSirXgGv29AefcjYhcRK6fzWy3xZsshTrnShHpRsBSwoGqngK4bYZ9AKWZfSxlbQnw3vdInjePBY2zqYHGBAEMzazTkrcVXFXfvnW2AXTMbJgN5ARyAjmBnEBOICeQE8gJ/I8EotKwsqU0KkE/S2lTy55WvZYvaGBlqGZ3AE5arbbpwCNxzg1EZP8Xzvd0OgDJTRHZijgnIYH5UjKb981sViCS+FjwqYvpXxCGoSGT3ADwUtd1dzwefyZRniNR1dC+dkiuAXitquroCz3xQc80EIK4AAAAAElFTkSuQmCC',
  Polygon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAy5JREFUWEe1l3mITmEUxn9DIZHshELZ848QhSKRhJI1NGpKEZpMWSLGrhRlKSIKRZZCzNhCZE+krFlKFJnIFpLyPtO5X7c79/reO9916jbNnfec87xnnnPOc4vwt0bAMmAy8B04Byzwd48/WZQiQCmwOXK+DNiUIkaNo2kAvAA6xyS7C0SfOExNzf8N8D44kAbAQ6Cn521vADcB/dQz0PkeDvnuA4r1exoA64HFEQBbgK9AF6CHAazrCXKlO1fuC6AZcA3obsFVjSQSDgO6At2AXkBvoE0MqDPAKF8AG4BFwElgnOcNg2MNnO+PGB+Rt8wHwGDgMlDHyvwkJQAd3wnMCvk9BcYDj3wAHLdbbwQW1iJ54DIV2AvUB0YDFT4kLAF2A98A8eB3AQDk+gro6GK2B97mA6CSPzAizXZE2lFgcrlft5bs76pwJx+ANe7GS1357zny9ckguUIcs/+9iCxCJ86BDsBzoJ4bJCOt5bLAsBWY6yZhrqJJJDxkS+coMDGLzBZjibvUOtdRq4AVSRXQjTUkZKqEZndWNtM6YVfQlnEVEDn6Amtt/WaVXHFGOBKedfFPuQU2JlyBbdabeqc2+Qg0zzKzxdJYVmfliK0KzAG2R5KJLPP/A4AWwAfgnZuObYMKxO15dYAWz5+MQWhTSk1pGrZ0HVGlCohk7SKJPtnkyzh/dbiXQCcbcNW7QDt9XiSTFI6ImLVpnJ8ABgFDgKsC0BDQ1BNDtb8D0x7YkyGCsdaCAiGrAkrCbdjYiCHxqUn1xUDdygjEFUCrPWyVSZMwOHzbSvWrliD6AcOt56ULa1gSAOm7S0Brp2RzAtIThEqs1pY0G5rHp+JfgkQfINoJMn2ARL8JwrGbABPsUWItscBEaOnHi8BqN+YH2B8+A6X5FNFytzGlXmWaF63cknpsU1M6TzecblyR7g/sGXAeOA1Uht5LPUuKSWvo/f18AOR7AJgWKaWCa1BpWQWm6XbB2kxb1Mt8AIgDMxKiqQpaLiqx9N5Pr6yhQz4ADgJTYgKLF1I4r9MmDZ/3AaDbqwphO+Ik9aRCEge+PgB0ttykuRaIxMR+m+kFY/gLE5mOOVrM+qUAAAAASUVORK5CYII='
};
var drawToolList = exports.drawToolList = [{
  title: '绘制点',
  mode: 'draw_point',
  icon: ControlICONS.Point
}, {
  title: '绘制线',
  mode: 'draw_line_string',
  icon: ControlICONS.Line
}, {
  title: '绘制面',
  mode: 'draw_polygon',
  icon: ControlICONS.Polygon
}, {
  title: '绘制矩形',
  mode: 'draw_rectangle',
  icon: ControlICONS.Rectangle
}, {
  title: '清除所有',
  mode: 'simple_select',
  icon: ControlICONS.Trash
}];