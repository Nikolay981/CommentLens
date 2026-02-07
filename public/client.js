document.addEventListener("DOMContentLoaded", () => {
    const analyzeBtn = document.getElementById("analyzeBtn");
    const urlInput = document.getElementById("urlInput");
    const resultsDiv = document.getElementById("results");
    const loadingDiv = document.getElementById("loading");

    const painPointsList = document.getElementById("painPoints");
    const questionsList = document.getElementById("frequentQuestions");
    const hooksList = document.getElementById("hookIdeas");

    analyzeBtn.addEventListener("click", async () => {
        const url = urlInput.value.trim();

        if (!url) {
            alert("Please enter a valid URL.");
            return;
        }

        // Reset state
        resultsDiv.classList.add("hidden");
        loadingDiv.classList.remove("hidden");
        analyzeBtn.disabled = true;

        try {
            const response = await fetch("/analyze-comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong.");
            }

            renderResults(data.analysis);
            loadingDiv.classList.add("hidden");
            resultsDiv.classList.remove("hidden");
        } catch (error) {
            alert("Error: " + error.message);
            loadingDiv.classList.add("hidden");
        } finally {
            analyzeBtn.disabled = false;
        }
    });

    function renderResults(analysis) {
        // Clear previous results
        painPointsList.innerHTML = "";
        questionsList.innerHTML = "";
        hooksList.innerHTML = "";

        analysis.painPoints.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            painPointsList.appendChild(li);
        });

        analysis.frequentQuestions.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            questionsList.appendChild(li);
        });

        analysis.hookIdeas.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            hooksList.appendChild(li);
        });
    }
});
