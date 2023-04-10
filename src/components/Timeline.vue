<script setup lang="ts">
import { DateTime} from 'luxon'
import { ref, computed } from 'vue'
import { TimelinePost, today, thisWeek, thisMonth  } from '../posts'
import { usePosts } from '../stores/posts'
import TimelineItem from './TimelineItem.vue';
import { periods, Period } from '../constants'

const postsStore = usePosts()

await postsStore.fetchPosts()
</script>

<template>
  <!-- <button @click="postsStore.updateFoo('bar')">Update</button> -->
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period of periods"
        :key="period"
        :class="{ 'is-active' : period === postsStore.selectedPeriod }"
        @click="postsStore.setSelectedPeriod(period)"
      >
        {{ period }}
      </a>
    </span>
    <TimelineItem
      v-for="post of postsStore.filteredPosts"
      :key="post.id"
      :post="post"
    />
  </nav>
</template>

<style>
</style>
