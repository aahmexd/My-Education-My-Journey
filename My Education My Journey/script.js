/*
Goal of the script: given responses to the quiz, provide a list of scholarships the submitter is eligible for.
*/

// Answers - map questions to submitted answers
let answers = {
  immigration_status: "TPS",
  gpa: 3.0,
  illinois_resident: true
};

// Scholarship Eligibility Criteria
const dream_eligibility_criteria = {
  immigration_status: ["DACA", "TPS"],
  gpa: 2.8,
  illinois_resident: true
};

const RISE_eligibility_criteria = {
  immigration_status: ["DACA", "TPS", "Non-DACA"],
  illinois_resident: true
};

const URO_eligibility_criteria = {
  immigration_status: ["DACA", "TPS", "Non-DACA"],
  gpa: 2.8,
  illinois_resident: true
};

function checkEligibility(answers, criteria) {
  let immigration_status_check = false;
  let gpa_check = false;
  let illinois_resident_check = false;

  // immigration status
  if (criteria.immigration_status.includes(answers.immigration_status) ||
    criteria.immigration_status.includes("ANY")) {
    immigration_status_check = true;
  }

  // GPA check
  if (answers.gpa >= criteria.gpa) {
    gpa_check = true;
  }

  // Illinois resident check
  illinois_resident_check = (answers.illinois_resident == true && criteria.illinois_resident == true) || criteria.illinois_resident == "ANY";

  return immigration_status_check && gpa_check && illinois_resident_check;
}

// Scholarship Descriptions
const scholarships = [
  {
    name: "The Dream US (National Scholarship)",
    desc: "We think of our National Scholarship as the “Pell Grant” for highly motivated undocumented students with significant, unmet financial need. While we consider your GPA and test scores, we place great emphasis on your demonstrated commitment to community service and your ability to overcome the barriers and challenges that undocumented students face each and every day.",
    criteria: dream_eligibility_criteria
  },
  {
    name: "Rise Act Map Grant",
    desc: "We think of our National Scholarship as the “Pell Grant” for highly motivated undocumented students with significant, unmet financial need. While we consider your GPA and test scores, we place great emphasis on your demonstrated commitment to community service and your ability to overcome the barriers and challenges that undocumented students face each and every day.",
    criteria: RISE_eligibility_criteria
  },
  {
    name: "Illinois Dream Fund",
    desc: "We think of our National Scholarship as the “Pell Grant” for highly motivated undocumented students with significant, unmet financial need. While we consider your GPA and test scores, we place great emphasis on your demonstrated commitment to community service and your ability to overcome the barriers and challenges that undocumented students face each and every day.",
    criteria: URO_eligibility_criteria
  },
  {
    name: "NEIU URO Scholarship",
    desc: "We think of our National Scholarship as the “Pell Grant” for highly motivated undocumented students with significant, unmet financial need. While we consider your GPA and test scores, we place great emphasis on your demonstrated commitment to community service and your ability to overcome the barriers and challenges that undocumented students face each and every day.",
    criteria: URO_eligibility_criteria
  }
];

// Checking eligibility for each scholarship
const eligibleScholarships = scholarships.filter(scholarship => checkEligibility(answers, scholarship.criteria));

// Display the filtered scholarships
displayResults(eligibleScholarships);

// Function to display results
function displayResults(scholarships) {
  const resultsContainer = document.getElementById('scholarship-results');
  if (scholarships.length === 0) {
    resultsContainer.innerHTML = "<p>No scholarships found based on your criteria.</p>";
  } else {
    let resultsHtml = "<ul>";
    scholarships.forEach(scholarship => {
      resultsHtml += `
        <li>
          <h2>${scholarship.name}</h2>
          <alt="${scholarship.name}" style="width: 100px; height: auto;">
          <p>${scholarship.desc}</p>
        </li>
      `;
    });
    resultsHtml += "</ul>";
    resultsContainer.innerHTML = resultsHtml;
  }
}
