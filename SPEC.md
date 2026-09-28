# Interactive Birthday Postcard

## Goal

Create a small interactive birthday postcard for my daughter.

The postcard should feel like a magical animated children's birthday card rather than a conventional website.

The application must run entirely in the browser without a backend.

## Technology

Use:

* HTML5
* CSS3
* Vanilla JavaScript
* SVG for vector illustrations and animated graphical elements
* Canvas only for particle effects such as confetti or fireworks
* Web Audio API or HTML5 Audio for optional sound

Do not use React, Vue, Angular, TypeScript, or any build system.

The project should work by opening `index.html` directly in a browser.

## Project structure

```
birthday-card/
  index.html
  style.css
  script.js
  assets/
```

## General requirements

* Mobile-first design.
* The postcard must work on both desktop and mobile browsers.
* The main content should fit the viewport without requiring horizontal scrolling.
* Use smooth CSS transitions and animations.
* Prefer CSS animations over JavaScript animation where possible.
* Use JavaScript for interaction and scene/state management.
* Avoid unnecessary dependencies.
* Keep the code readable and well commented.
* Do not use external JavaScript libraries.

## Visual style

The visual style should be:

* cheerful
* magical
* warm
* colorful
* suitable for a young child of age range 6-10
* playful but not visually overwhelming

Use rounded shapes, soft shadows, stars, balloons, sparkles and other birthday-themed elements.

Avoid a corporate/web-application appearance.

## Scene system

Implement the postcard as a sequence of scenes.

Create a JavaScript state variable representing the current scene.

Example:

```
INTRO
PRESENT
MAGIC
BIRTHDAY
FINAL
```

Only one scene should normally be active at a time.

Changing scenes should use a short fade/scale transition.

The user should never see an abrupt replacement of the entire page.

## Scene 1 — Начало

Display a magical birthday environment.

Show:

* animated stars
* subtle floating particles
* a large closed present
* a short invitation such as:

  "Сегодня будет приключение..."

Display a large button:

```
Начать историю
```

When the user clicks/taps the present or button:

* animate the present opening
* release several balloons
* start playing relaxed background music if audio is enabled
* transition to Scene 2

## Scene 2 — Introduction

Действие происходит на открытой поляне возле леса. В правом верхнем угла виден лес. Перед лесом расположены два куста, на одном кусте есть красные ягодки, на втором синие ягодки.

Справа и сверху виден луг с высокой травой.

Слева по центру виден одноэтажный домик с покатой крышей. Рядом с домиком стоит пустая конура для собаки. Возле дома стоит лестница на крышу. 

Слева внизу растет дерево, на большой ветке которого висит пустая качеля.

В правом нижнем углу виден небольшой пруд окруженный камышами. Возле пруда есть несколько цветов.

По центру стоит девочка с радостным выражением лица. У девочки белая кожа, светлые волосы, голубые глаза. На голове хвостики, она одета в кофточку и штанишки. 

Девочка стоит на дороге, дорога ведет к лесу, к пруду, к дому и к дереву. Дорога не прямая, а немного извилистая и петляет между элементами сцены.

В карточке есть внутренний счетчик найденых животных. Начальное значение счетчика - 0.

Tell the child:

```
"Найди зверюшек?"
```

При нажатии на область начинается уникальная сцена.

При нажатии на 
* куст с красными ягодами управление передается сцене Scene 3 — Куст с красными ягодами
* куст с синими ягодами управление передается сцене Scene 4 — Куст с синими ягодами
* луг с высокой травой управление передается сцене Scene 5 — Луг
* конуру управление передается сцене Scene 6 — Конура
* камыш управление передается сцене Scene 7 — Камыш
* при нажатии на дом, если счетчик животных равен 2 или более, то управлени передается сцене 8 - Дом

## Scene 3 — Куст с красными ягодами

Сцена содержит следующие анимационные действия:

* девочка идет по тропинке к лесу, подходит к кусту. 
* трогает куст с красными ягодками
* проигрывается звук шелеста листьев
* из-за одного дерева выглядывает маленький медвежонок, девочка подпрыгивает, и убегает назад в центр сцены.
* идет назад к центру экрана и исходной позиции.
* медвежонок прячется за дерево.
* Управление переходит сцене 2.

## Scene 4 — Куст с синими ягодами

Сцена содержит следующие анимационные действия для куста с синими ягодами:

* девочка идет по тропинке к лесу, подходит к кусту. 
* девочка трогает куст с синими ягодками
* проигрывается звук шелеста листьев
* из куста вылетают две синички и разлетаются в разные стороны.
* девочка радостно прыгает и хлопает в ладоши
* девочка идет назад к центру экрана и исходной позиции.
* птицы улетают за края экрана.
* Управление переходит сцене 2.

## Scene 5 — Луг

Сцена содержит следующие анимационные действия:

* девочка идет по тропинке к лугу, подходит в одно место. 
* девочка осматривается вокруг, поворачивает голову влево, и поворачивает голову вправо
* пожимает плечами
* идет к другому месту внутри луга.
* девочка осматривается вокруг, поворачивает голову влево, и поворачивает голову вправо
* девочка пожимает плечами
* девочка идет назад к центру экрана и исходной позиции.
* Управление переходит сцене 2.

## Scene 6 — Конура

Сцена содержит следующие анимационные действия:

* девочка идет по тропинке к дому, потом подходит к конуре. 
* из конуры выходит собачка и становится рядом с девочкой.
* девочка прыгает и радуется.
* собака виляет хвостом.
* девочка идет назад к центру экрана и исходной позиции.
* собака заходит в конуру.
* Управление переходит сцене 2.

## Scene 7 — Камыш

Сцена содержит следующие анимационные действия:

* девочка идет по тропинке к пруду, потом подходит к камышу. 
* из камыша выглядывает лягушка.
* девочка прыгает и радуется.
* лягушка прыгает.
* девочка идет назад к центру экрана и исходной позиции.
* прячетса в камыш.
* Управление переходит сцене 2.

## Scene 8 — Торт

Display a large birthday cake.

Show candles with animated flames.

Display:

```
"С Днем Рожденья, Ульяна!"
```

The child should be able to interact with the candles.

Действвияй:

* clicking/tapping a candle extinguishes its flame
* after all candles are extinguished, start a celebration animation

After the last candle:

* launch confetti
* animate balloons
* display a large birthday greeting
* play a short celebration sound

## Scene 9 — Финальное поздравление

Display a warm personal birthday message.

Example structure:

```
С Днем Рожденья, Ульяна!

Мы тебя очень сильно любим!

Веселого тебе дня рождения. Ты очень большая умница и мы гордимся как ты стараешься и занимаешься.
```

The exact text should be stored in a JavaScript configuration object so it is easy to change.

Add a button:

```
Начать сначала
```

The button should restart the experience from Scene 1.

## Animation requirements

Use a mixture of:

* CSS keyframe animations
* CSS transforms
* opacity transitions
* SVG animations where appropriate
* JavaScript-generated particles for confetti

Animations should be smooth and lightweight.

Do not continuously execute expensive JavaScript animation loops when CSS animation can accomplish the same effect.

Respect the user's `prefers-reduced-motion` setting.

When reduced motion is enabled, replace large animations with simple fades.

## Interaction requirements

All interactive elements must:

* work with mouse
* work with touch
* be keyboard accessible where practical
* have visible hover/focus states

Do not rely exclusively on hover interactions.

Buttons should be large enough to comfortably tap on a phone.

## Sound

Sound is optional.

Because browsers commonly block autoplay:

* do not attempt to autoplay audio when the page loads
* only start audio after an explicit user interaction
* provide a mute/unmute control
* remember the mute state during the current session

The postcard must remain fully usable without sound.

## Responsive behavior

Support approximately:

* phone landscape
* tablet
* desktop

The main visual composition should scale rather than requiring separate implementations for each device.

Avoid fixed pixel positioning for the entire scene.

## Accessibility

Use semantic HTML where appropriate.

Buttons must have accessible labels.

Important text must remain readable against the background.

Do not communicate important information using color alone.

Support keyboard navigation.

Support `prefers-reduced-motion`.

## Performance

The postcard should load quickly.

Avoid large external assets.

Prefer SVG for simple illustrations.

Avoid unnecessary DOM elements.

If Canvas is used for confetti, limit the number of particles and stop the animation when the celebration is finished.

## Configuration

Put personal information in one configuration object in `script.js`.

For example:

```
const CARD_CONFIG = {
    daughterName: "...",
    birthdayMessage: "...",
    finalMessage: "..."
};
```

Changing the daughter's name or message should not require modifying the scene logic.

## Code organization

Keep responsibilities separated:

* `index.html` — page structure
* `style.css` — visual appearance and CSS animations
* `script.js` — application state, interaction and scene transitions

Organize JavaScript into small functions such as:

* `showScene()`
* `openPresent()`
* `findMagicStar()`
* `extinguishCandle()`
* `startCelebration()`
* `createConfetti()`
* `restartCard()`

Avoid putting the entire application into one large function.

## Important implementation rule

Do not implement all scenes at once.

First implement the basic scene/state architecture and Scene 1.

Then implement each subsequent scene while keeping the existing scenes functional.

Before adding additional visual effects, make sure the interaction flow works correctly.

## Expected result

The final result should feel like a small interactive animated story:

Начало → Введение → Поиск зверей → Торт из дня рождения → Затушить свечки → Конфетти → Персональное сообщение

The experience should take approximately 1–3 minutes to complete and should be enjoyable for a child to operate without adult instructions.
