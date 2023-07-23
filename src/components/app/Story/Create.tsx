const addStory = async () => {
  const name = prompt("Story name?")
  if (name) {
    const newStory: Story = {
      id: Date.now().toString() + Math.round(Math.random() * 1000).toString(),
      name,
      lastEdited: new Date().toLocaleString(),
    }
    await fetch("/api/stories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStory),
    })
    setStories([...stories(), newStory])
  }
}
