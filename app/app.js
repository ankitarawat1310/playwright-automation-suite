const API = 'http://localhost:4000';   // same port as your mock server
const token = 'test-token';            // must match server middleware

async function postJson(path, data) {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  return { status: res.status, body: await res.json().catch(() => ({})) };
}

const userForm = document.getElementById('userForm');
userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    accountType: document.getElementById('accountType').value
  };
  const { status, body } = await postJson('/api/users', payload);
  document.getElementById('userMsg').textContent =
    status === 201 ? `User OK: ${body.id}` : `Error: ${body.error}`;
});

const txForm = document.getElementById('txForm');
txForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    userId: document.getElementById('userId').value,
    amount: Number(document.getElementById('amount').value),
    type: document.getElementById('type').value,
    recipientId: document.getElementById('recipientId').value
  };
  const { status, body } = await postJson('/api/transactions', payload);
  document.getElementById('txMsg').textContent =
    status === 201 ? `Tx OK: ${body.id}` : `Error: ${body.error}`;
});
