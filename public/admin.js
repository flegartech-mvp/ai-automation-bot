const adminBusinessName = document.querySelector("#adminBusinessName");
const refreshButton = document.querySelector("#refreshButton");
const conversationStat = document.querySelector("#conversationStat");
const leadStat = document.querySelector("#leadStat");
const newLeadStat = document.querySelector("#newLeadStat");
const completedLeadStat = document.querySelector("#completedLeadStat");
const conversationList = document.querySelector("#conversationList");
const leadTableBody = document.querySelector("#leadTableBody");
const adminAlert = document.querySelector("#adminAlert");

const statuses = ["new", "contacted", "completed", "cancelled"];

function formatDate(value) {
  if (!value) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function setStats(stats = {}) {
  conversationStat.textContent = String(stats.conversations || 0);
  leadStat.textContent = String(stats.leads || 0);
  newLeadStat.textContent = String(stats.newLeads || 0);
  completedLeadStat.textContent = String(stats.completedLeads || 0);
}

function setAdminAlert(message = "") {
  adminAlert.textContent = message;
  adminAlert.hidden = !message;
}

function renderConversations(conversations = []) {
  conversationList.innerHTML = "";

  if (conversations.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-admin";
    empty.textContent = "No conversations yet.";
    conversationList.append(empty);
    return;
  }

  for (const conversation of conversations) {
    const item = document.createElement("article");
    item.className = "conversation-item";

    const title = document.createElement("strong");
    title.textContent = conversation.customerName || "Unknown customer";

    const meta = document.createElement("span");
    meta.textContent = `${conversation.requestType} | ${conversation.status} | ${conversation.messageCount} messages`;

    const latest = document.createElement("span");
    latest.textContent = conversation.latestMessage || "No message preview";

    const time = document.createElement("span");
    time.textContent = formatDate(conversation.lastMessageAt);

    item.append(title, meta, latest, time);
    conversationList.append(item);
  }
}

function createStatusSelect(lead) {
  const select = document.createElement("select");

  for (const status of statuses) {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = status;
    option.selected = lead.status === status;
    select.append(option);
  }

  select.addEventListener("change", async () => {
    select.disabled = true;

    try {
      const response = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: select.value }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Status update failed.");
      }

      await loadDashboard();
    } catch (error) {
      alert(error.message);
      select.value = lead.status;
    } finally {
      select.disabled = false;
    }
  });

  return select;
}

function renderLeads(leads = []) {
  leadTableBody.innerHTML = "";

  if (leads.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.className = "empty-admin";
    cell.colSpan = 4;
    cell.textContent = "No leads captured yet.";
    row.append(cell);
    leadTableBody.append(row);
    return;
  }

  for (const lead of leads) {
    const row = document.createElement("tr");

    const customer = document.createElement("td");
    const customerName = document.createElement("strong");
    customerName.textContent = lead.customerName || "Unknown";
    const contact = document.createElement("span");
    contact.textContent = [lead.email, lead.phone].filter(Boolean).join(" / ") || "No contact yet";
    customer.append(customerName, contact);

    const request = document.createElement("td");
    const requestType = document.createElement("strong");
    requestType.textContent = lead.requestType || "customer inquiry";
    const products = document.createElement("span");
    products.textContent = (lead.productInterest || []).join(", ") || lead.need || "No product listed";
    request.append(requestType, products);

    const details = document.createElement("td");
    const preferred = document.createElement("strong");
    preferred.textContent = lead.preferredDateTime || lead.orderNumber || "Pending details";
    const notes = document.createElement("span");
    notes.textContent = lead.notes || "No notes";
    details.append(preferred, notes);

    const status = document.createElement("td");
    status.append(createStatusSelect(lead));

    row.append(customer, request, details, status);
    leadTableBody.append(row);
  }
}

async function loadDashboard() {
  refreshButton.disabled = true;

  try {
    setAdminAlert();
    const response = await fetch("/api/admin/summary");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Dashboard failed to load.");
    }

    adminBusinessName.textContent = `${data.businessName || "Store"} Admin`;
    setStats(data.stats);
    renderConversations(data.conversations);
    renderLeads(data.leads);
  } catch (error) {
    setAdminAlert(error.message);
  } finally {
    refreshButton.disabled = false;
  }
}

refreshButton.addEventListener("click", loadDashboard);

await loadDashboard();
