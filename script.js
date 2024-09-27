document
  .getElementById("urlForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent the form from reloading the page

    const urlInput = document.getElementById("urlInput").value;

    if (!urlInput) {
      alert("Please enter a valid URL");
      return;
    }

    try {
      const response = await fetch("http://localhost:8001/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: urlInput }),
      });

      const data = await response.json();

      if (response.ok) {
        document.getElementById(
          "result"
        ).innerHTML = `Shortened URL: <a href="http://localhost:8001/${data.id}">http://localhost:8001/${data.id}</a>`;
      } else {
        console.log("Server Error:", data.error); // Log server-side error
        document.getElementById("result").innerHTML = `Error: ${data.error}`;
      }
    } catch (error) {
      console.error("Network Error:", error); // Log network errors
      document.getElementById("result").innerHTML = "Error shortening URL";
    }
  });
