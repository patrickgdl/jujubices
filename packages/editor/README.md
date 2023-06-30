# Jujubices Editor

Invite Builder from [jujubices.com](https://jujubices.com).

## Components

- @layerhub-io/react: This editor is using SDK for react.

## How to start

Clone the project:

```
git clone https://github.com/layerhub-io/react-editor
```

Install dependencies.

```
npm i
```

Start the project on development mode

```
npm run dev
```

App should be running now.

## Editor/Template structure

```
interface Template {
  id: string
  type: string
  name: string
  frame: IFrame
  scene: IScene
  metadata: any
  preview: {
    id: string
    src: string
  }
  published: boolean
}
```

Every template has a `frame` and `scene`. `frame` is the measure of the template (width and height) and `scene` has all the layers of the template (image, texts, backgrounds).

`preview` is the image that will be shown on the template list.
