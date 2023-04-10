<script setup lang="ts">
// import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';
import { TimelinePost } from '../posts'
const props =  defineProps<{
  post: TimelinePost
}>()
</script>

<template>
  <RouterLink
    :to="`/posts/${post.id}`"
    class="panel-block is-flex is-flex-direction-column is-align-items-flex-start">
    <a data-testid="post-title">{{ post.title }}</a>
    <div data-testid="post-created">{{ post.created.toFormat("d MMM") }}</div>
  </RouterLink>
</template>