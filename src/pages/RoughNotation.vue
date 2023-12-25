<template>
  <div>
    <div id="myElement1">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis fugiat
      laboriosam atque rerum. Dolore totam libero natus neque accusamus. Eum,
      explicabo. Fugit pariatur quibusdam soluta. Illo vero earum recusandae
      molestias.
    </div>
    <div id="myElement2" class="m-t-10">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui fuga vitae
      at error quaerat excepturi incidunt nisi explicabo tenetur. Voluptatem
      voluptatibus ut nisi corrupti dicta porro, nemo neque enim laborum.
    </div>
    <div id="myElement3" class="m-t-10">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
      facilis eaque a corporis repellat repellendus ipsum. Consequatur deserunt
      fugiat, eveniet cum facilis quos quo velit veniam? Magnam obcaecati eaque
      minus.
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RoughAnnotationType } from "rough-notation/lib/model";
import { annotate } from "rough-notation";

const elArr = reactive<{ id: string; type: RoughAnnotationType }[]>([
  {
    id: "myElement1",
    type: "underline",
  },
  {
    id: "myElement2",
    type: "box",
  },
  {
    id: "myElement3",
    type: "circle",
  },
]);
let iterator = myGenerator(elArr);

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      const item = iterator.next();
      if (!item.done) {
        const el = document.getElementById(item.value.id);
        const annotation = annotate(el as HTMLElement, {
          type: item.value.type,
        });
        annotation.show();
      }
    }
  });
});

function* myGenerator(arr: { id: string; type: RoughAnnotationType }[]) {
  let nextIndex = 0;
  while (nextIndex < arr.length) {
    yield arr[nextIndex++];
  }
}
</script>