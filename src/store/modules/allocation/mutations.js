export default {

  'SET_ALLOCATION'(state, allocation) {
    state.allocation = allocation;
  },

  'SET_ALLOCATIONS'(state, allocations) {
    state.allocations = allocations;
  },

  'UPDATE_PAGE'(state, { currentPage, content, _links }) {
    const { allocations } = state
    allocations.page.content[currentPage] = content
    allocations.page.currentPage = currentPage
    allocations.page._links = _links
  },
}
