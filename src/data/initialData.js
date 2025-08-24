// Initial data for RTG AE System
// This data will be automatically loaded on first app initialization

export const INITIAL_RTG_DATA = {
  "rtg_ae_whiteboard_notes": "[{\"id\":\"meg4o54fz61uw1w7owo1\",\"title\":\"This is an L0 end to end\",\"description\":\"This is a test\",\"tags\":[],\"stream\":null,\"created_at\":\"2025-08-17T20:17:45.825Z\",\"promoted_to_deliverable_id\":\"meg4ohpd817ekqkyvzav\"}]",
  "rtg_ae_streams": "[{\"id\":\"vohcav\",\"name\":\"Getting Started\",\"color\":\"#3B82F6\",\"description\":\"\",\"created_at\":\"2025-08-17T20:18:02.785Z\",\"promoted_to_deliverable_id\":\"meg4ohpd817ekqkyvzav\"}]",
  "rtg_ae_functional_deliverables": [
    {
      "id": "getting_started_guide",
      "title": "RTG System Quick Start Guide",
      "description": "Welcome to your RTG Program Board! This interactive guide will help you get started with the system.",
      "stream_id": "stream_id",
      "readiness": "ready",
      "alignment": null,
      "target_date": null,
      "created_at": "2025-08-17T08:38:07.978Z",
      "promoted_from_l0": null,
      "checklist": [
        {
          "id": "checklist1",
          "text": "Click the collapse button to minimize streams",
          "done": false
        },
        {
          "id": "checklist2", 
          "text": "Drag cards between streams to reorganize",
          "done": false
        },
        {
          "id": "checklist3",
          "text": "Use the Add Deliverable button to create new cards",
          "done": false
        }
      ],
      "owner_name": null,
      "owner_email": null,
      "comments": []
    }
  ],
  "rtg_ae_execution_tracks": "[]"
};

// Function to initialize data if localStorage is empty
export function initializeDataIfEmpty() {
  // Check if any RTG data exists
  let hasData = false;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('rtg_ae_')) {
      hasData = true;
      break;
    }
  }

  // If no data exists, load the initial data
  if (!hasData) {
    console.log('No RTG data found, loading initial data...');
    Object.keys(INITIAL_RTG_DATA).forEach(key => {
      localStorage.setItem(key, INITIAL_RTG_DATA[key]);
    });
    console.log('Initial data loaded successfully!');
    return true;
  }

  return false;
}
