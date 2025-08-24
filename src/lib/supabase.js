// Supabase Client Configuration Template
// Place this file in src/lib/supabase.js when implementing database features

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// RTG AE System Database Functions

// ===== USERS =====
export const getUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('active', true)
  return { data, error }
}

export const getUserById = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  return { data, error }
}

export const createUser = async (user) => {
  const { data, error } = await supabase
    .from('users')
    .insert([{
      name: user.name,
      email: user.email,
      role: user.role || 'Team Member',
      active: true,
      subscription_status: user.subscription_status || 'trial'
    }])
    .select()
  return { data, error }
}

export const updateUser = async (userId, updates) => {
  const { data, error } = await supabase
    .from('users')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
  return { data, error }
}

// ===== PROJECTS =====
export const getProjects = async (userId) => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      created_by_user:users!created_by(name, email)
    `)
    .eq('created_by', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

export const getProjectById = async (projectId) => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      created_by_user:users!created_by(name, email)
    `)
    .eq('id', projectId)
    .single()
  return { data, error }
}

export const createProject = async (project) => {
  const { data, error } = await supabase
    .from('projects')
    .insert([{
      name: project.name,
      description: project.description,
      status: project.status || 'Active',
      created_by: project.created_by
    }])
    .select()
  return { data, error }
}

export const updateProject = async (projectId, updates) => {
  const { data, error } = await supabase
    .from('projects')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', projectId)
    .select()
  return { data, error }
}

export const deleteProject = async (projectId) => {
  const { data, error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId)
  return { data, error }
}

// ===== STREAMS =====
export const getStreams = async (projectId) => {
  const { data, error } = await supabase
    .from('streams')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true })
  return { data, error }
}

export const getStreamById = async (streamId) => {
  const { data, error } = await supabase
    .from('streams')
    .select('*')
    .eq('id', streamId)
    .single()
  return { data, error }
}

export const createStream = async (stream) => {
  const { data, error } = await supabase
    .from('streams')
    .insert([{
      project_id: stream.project_id,
      name: stream.name,
      description: stream.description,
      color: stream.color || '#3B82F6',
      collapsed: stream.collapsed || false
    }])
    .select()
  return { data, error }
}

export const updateStream = async (streamId, updates) => {
  const { data, error } = await supabase
    .from('streams')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', streamId)
    .select()
  return { data, error }
}

export const deleteStream = async (streamId) => {
  const { data, error } = await supabase
    .from('streams')
    .delete()
    .eq('id', streamId)
  return { data, error }
}

// ===== FUNCTIONAL DELIVERABLES =====
export const getDeliverables = async (projectId, streamId = null) => {
  let query = supabase
    .from('functional_deliverables')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true })
  
  if (streamId) {
    query = query.eq('stream_id', streamId)
  }
  
  const { data, error } = await query
  return { data, error }
}

export const getDeliverableById = async (deliverableId) => {
  const { data, error } = await supabase
    .from('functional_deliverables')
    .select(`
      *,
      stream:streams(name, color),
      checklist_items(*)
    `)
    .eq('id', deliverableId)
    .single()
  return { data, error }
}

export const createDeliverable = async (deliverable) => {
  const { data, error } = await supabase
    .from('functional_deliverables')
    .insert([{
      project_id: deliverable.project_id,
      stream_id: deliverable.stream_id,
      title: deliverable.title,
      description: deliverable.description,
      target_date: deliverable.target_date,
      original_date: deliverable.original_date || deliverable.target_date,
      assigned_user: deliverable.assigned_user,
      owner: deliverable.owner,
      status: deliverable.status || 'Not Started',
      priority: deliverable.priority || 'Medium',
      planning_accuracy_score: deliverable.planning_accuracy_score || 100
    }])
    .select()
  return { data, error }
}

export const updateDeliverable = async (deliverableId, updates) => {
  const updateData = { ...updates, updated_at: new Date().toISOString() }
  
  // If status is being changed to completed, set completed_at
  if (updates.status === 'Completed' || updates.status === 'Done') {
    updateData.completed_at = new Date().toISOString()
  }
  
  const { data, error } = await supabase
    .from('functional_deliverables')
    .update(updateData)
    .eq('id', deliverableId)
    .select()
  return { data, error }
}

export const deleteDeliverable = async (deliverableId) => {
  const { data, error } = await supabase
    .from('functional_deliverables')
    .delete()
    .eq('id', deliverableId)
  return { data, error }
}

// ===== CHECKLIST ITEMS =====
export const getChecklistItems = async (deliverableId) => {
  const { data, error } = await supabase
    .from('checklist_items')
    .select('*')
    .eq('deliverable_id', deliverableId)
    .order('created_at', { ascending: true })
  return { data, error }
}

export const createChecklistItem = async (checklistItem) => {
  const { data, error } = await supabase
    .from('checklist_items')
    .insert([{
      deliverable_id: checklistItem.deliverable_id,
      text: checklistItem.text,
      done: checklistItem.done || false
    }])
    .select()
  return { data, error }
}

export const updateChecklistItem = async (itemId, updates) => {
  const updateData = { ...updates, updated_at: new Date().toISOString() }
  
  // If item is being marked as done, set done_at timestamp
  if (updates.done === true) {
    updateData.done_at = new Date().toISOString()
  } else if (updates.done === false) {
    updateData.done_at = null
  }
  
  const { data, error } = await supabase
    .from('checklist_items')
    .update(updateData)
    .eq('id', itemId)
    .select()
  return { data, error }
}

export const deleteChecklistItem = async (itemId) => {
  const { data, error } = await supabase
    .from('checklist_items')
    .delete()
    .eq('id', itemId)
  return { data, error }
}

// ===== ANALYTICS & REPORTING =====
export const getProjectAnalytics = async (projectId) => {
  // Get project overview with counts
  const { data: deliverables, error: delError } = await supabase
    .from('functional_deliverables')
    .select('status, planning_accuracy_score, target_date, original_date, completed_at')
    .eq('project_id', projectId)
  
  if (delError) return { data: null, error: delError }
  
  // Calculate analytics
  const totalDeliverables = deliverables.length
  const completedDeliverables = deliverables.filter(d => 
    d.status === 'Completed' || d.status === 'Done'
  ).length
  
  const averageAccuracy = deliverables.length > 0 
    ? deliverables.reduce((sum, d) => sum + (d.planning_accuracy_score || 100), 0) / deliverables.length
    : 100
  
  // Calculate slip days
  const slipDays = deliverables.reduce((total, d) => {
    if (d.target_date && d.original_date) {
      const target = new Date(d.target_date)
      const original = new Date(d.original_date)
      const diffTime = target.getTime() - original.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return total + Math.max(0, diffDays)
    }
    return total
  }, 0)
  
  return {
    data: {
      totalDeliverables,
      completedDeliverables,
      completionRate: totalDeliverables > 0 ? (completedDeliverables / totalDeliverables) * 100 : 0,
      averageAccuracy: Math.round(averageAccuracy),
      totalSlipDays: slipDays
    },
    error: null
  }
}

// Authentication (if needed)
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
