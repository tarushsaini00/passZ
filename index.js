function maskPassword(pass) {
  let str = " ";
  for (let index = 0; index < pass.length; index++) {
    str += "*";
  }
  return str;
}

function copyText(txt) {
  navigator.clipboard.writeText(txt).then(
    () => {
      /* clipboard successfully set */
      document.getElementById("alert").style.display = "inline";
      setTimeout(() => {
        document.getElementById("alert").style.display = "none";
      }, 2000);
    },
    () => {
      /* clipboard write failed */
      alert("Clipboard copying failed");
    }
  );
}

// Logic to fill the thble
const deletePassword = (website) => {
  let data = localStorage.getItem("passwords");
  let arr = JSON.parse(data);
  arrUpdated = arr.filter((e) => {
    return e.website != website;
  });
  localStorage.setItem("passwords", JSON.stringify(arrUpdated));
  alert(`Sucessfully Deleted ${website}'s password`);
  showPasswords();
};

const showPasswords = () => {
  let tb = document.querySelector("table");
  let data = localStorage.getItem("passwords");
  if (data == null || JSON.parse(data).length == 0) {
    tb.innerHTML = "No Data to Show";
  } else {
    tb.innerHTML = `   <tr>
        <th >Website</th>
        <th >Username</th>
        <th >Password</th>
        <th >Delete</th>
      </tr>`;
    let arr = JSON.parse(data);
    let str = "";
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];

      str += `<tr>
<td>${element.website}</td>
<td>${element.username}</td>
<td>${maskPassword(element.passwords)}<img onclick="copyText('${
        element.passwords
      }')" src="./copy.svg" alt="Copy Button"   width="10" height="10"></td>

<td><button class="btnsm" onclick="deletePassword('${
        element.website
      }')">Delete</button></td>
</tr>`;
    }
    tb.innerHTML = tb.innerHTML + str;
  }
  website.value = "";
  username.value = "";
  password.value = "";
};

console.log("Working");
showPasswords();
document.querySelector(".btn").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Clicked...");
  console.log(website.value, username.value, password.value);
  let passwords = localStorage.getItem("passwords");
  console.log(passwords);

  if (passwords == null) {
    let jeson = [];
    jeson.push({
      website: website.value,
      username: username.value,
      passwords: password.value,
    });
    alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(jeson));
  } else {
    let jeson = JSON.parse(localStorage.getItem("passwords"));
    jeson.push({
      website: website.value,
      username: username.value,
      passwords: password.value,
    });
    alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(jeson));
  }
  showPasswords();
});
